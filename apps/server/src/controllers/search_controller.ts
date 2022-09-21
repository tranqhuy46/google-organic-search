import HttpStatusCodes from "http-status-codes";
import { body, check } from "express-validator";
import SearchService from "@gsc/server/services/search_service";
import Pup from "@gsc/server/vendors/puppeteer";
import { checkIfAnyError } from "@gsc/server/routes/express_validate_middleware";
import { UnauthorizedError } from "@gsc/server/shared/error";
import KeywordReportRepo from "@gsc/server/repository/keyword_report_repo";
import { KeywordReportStatus } from "ui/shared/type";
import type { RequestHandler } from "express";
import type { IReq } from "@gsc/server/shared/type";
import type { ValidationChain } from "express-validator";
import { KeywordReport } from "../entity/KeywordReport";

/** constants */
const { OK } = HttpStatusCodes;

const ANTI_XSS_REGEXP =
  /(\b)(on\S+)(\s*)=|javascript|<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/gi;

/** validate */
const validate = (method: "searchForKeyword") => {
  let chain: ValidationChain[] = [];
  switch (method) {
    case "searchForKeyword": {
      chain.push(
        body("keywords")
          .exists()
          .withMessage("no-keywords-provided")
          .isArray({
            max: 100,
            min: 1,
          })
          .withMessage("invalid-keywords-body-provided"),
        check("keywords.*")
          .isString()
          .withMessage("invalid-keyword")
          .isLength({
            min: 1,
            max: 126,
          })
          .withMessage("invalid-keyword-length")
          .not()
          .matches(ANTI_XSS_REGEXP)
          .withMessage("xss-detected-keyword")
          .customSanitizer((input) => {
            const match = ANTI_XSS_REGEXP.exec(input);
            if (match == null) {
              return input;
            }
          })
      );
      break;
    }
  }
  chain.push(checkIfAnyError as any);
  return chain;
};

export { validate };

const searchForKeyword: RequestHandler = async (
  req: IReq<{
    keywords: string[];
  }>,
  res,
  next
) => {
  try {
    const user = res.locals.sessionUser;
    if (!user || !user?.id) {
      throw new UnauthorizedError();
    }

    const { keywords } = req.body;
    const sanitizedKeywords = keywords.map((w) => w.trim().toLowerCase());

    // TODO: loop [sanitizedKeywords] & put this scope into task queue <!-
    const browser = await Pup.launchBrowserInstance();
    for (const sanitizedKeyword of sanitizedKeywords) {
      const foundReport = await KeywordReportRepo.findOneByKeyword(
        sanitizedKeyword,
        user.id
      );

      if (foundReport) {
        const updateToProccessingPayload: Partial<KeywordReport> = {
          ...foundReport,
          status: KeywordReportStatus.PROCESSING,
        };

        await KeywordReportRepo.upsertKeywordReport(updateToProccessingPayload);
      }

      const generatedReportBody =
        await SearchService.searchGoogleWithKeywordsByPuppeteer(
          browser,
          sanitizedKeyword
        );

      const payload: Partial<KeywordReport> = {
        id: foundReport?.id,
        ...generatedReportBody,
        owner: {
          ...user,
        },
      };

      await KeywordReportRepo.upsertKeywordReport(payload);
    }
    await browser.close();
    // TODO: put this scope into task queue -!>

    res.status(OK).json({
      total: sanitizedKeywords.length,
    });
  } catch (error) {
    next(error);
  }
};

const getKeywordReports: RequestHandler = async (req, res) => {
  const user = res.locals.sessionUser;
  if (!user) {
    throw new UnauthorizedError();
  }
  const reports = await SearchService.getUserKeywordReports(user.id);
  res.status(OK).json(reports);
};

export default {
  searchForKeyword,
  getKeywordReports,
} as const;
