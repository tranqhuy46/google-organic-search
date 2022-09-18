import puppeteer from "puppeteer";
import SearchService from "@gsc/server/services/search_service";
import Pup from "@gsc/server/vendors/puppeteer";
import type { RequestHandler } from "express";
import type { IReq } from "@gsc/server/shared/type";

const searchForKeyword: RequestHandler = async (
  req: IReq<{
    keywords: string[];
  }>,
  res
) => {
  const { keywords } = req.body;
  const browser = await Pup.launchBrowserInstance();
  const html = await SearchService.searchGoogleWithKeywordsByPuppeteer(browser);
  res.status(200).send(html);
};

export default {
  searchForKeyword,
} as const;
