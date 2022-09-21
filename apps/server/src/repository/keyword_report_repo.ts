import HttpStatusCodes from "http-status-codes";
import { KeywordReport } from "@gsc/server/entity/KeywordReport";
// import { CustomError } from "@gsc/server/shared/error";
import { AppDataSource } from "../data_source";

/** errors */
// class ReportFailed extends CustomError {
//   public static readonly Msg = "user-create-failed-db";
//   public static readonly HttpStatus = HttpStatusCodes.INTERNAL_SERVER_ERROR;
//   constructor() {
//     super(ReportFailed.Msg, ReportFailed.HttpStatus);
//   }
// }

const keywordReportRepository = AppDataSource.getRepository(KeywordReport);

/** API(s) */

async function findOneByKeyword(keyword: string, ownerId: string) {
  try {
    const foundReport = await keywordReportRepository.findOneBy({
      keyword,
      owner: {
        id: ownerId,
      },
    });
    return foundReport;
  } catch (error) {
    return null;
  }
}

async function findUserKeywordReports(ownerId: string) {
  try {
    const reports = await keywordReportRepository.find({
      select: {
        id: true,
        keyword: true,
        status: true,
        totalAdwords: true,
        totalResults: true,
        totalSeconds: true,
        // NOTE: html and links are very heavy!
      },
      where: {
        owner: { id: ownerId },
      },
    });
    return reports;
  } catch (error) {
    return null;
  }
}

async function upsertKeywordReport(reportPayload: Partial<KeywordReport>) {
  try {
    const report = await keywordReportRepository.save(reportPayload);
    return report;
  } catch (error) {
    return null;
  }
}

export default {
  findOneByKeyword,
  findUserKeywordReports,
  upsertKeywordReport,
} as const;
