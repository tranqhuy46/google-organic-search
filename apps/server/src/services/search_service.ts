import KeywordReportRepo from "@gsc/server/repository/keyword_report_repo";
import NumberUtils from "@gsc/server/utils/number";
import { KeywordReport } from "@gsc/server/entity/KeywordReport";
import { KeywordReportStatus } from "ui/shared/type";
import type { Browser, Page } from "puppeteer";

async function extractKeywordReportStats(page: Page) {
  const statsHandle = await page.$("div#result-stats");

  const innerText = await page.evaluate((statsDiv: HTMLDivElement) => {
    return statsDiv.innerText;
  }, statsHandle);

  const GOOGLE_SEARCH_REGEX = /(\d)+((\,|\.)(\d)+(\,|\.)*(\d)*)/g;
  let matchArr: RegExpExecArray;
  let index = 0;
  const reportStats = {
    totalResults: 0,
    totalSeconds: 0,
  };

  while ((matchArr = GOOGLE_SEARCH_REGEX.exec(innerText)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (matchArr.index === GOOGLE_SEARCH_REGEX.lastIndex) {
      GOOGLE_SEARCH_REGEX.lastIndex++;
    }

    if (index === 0) {
      reportStats.totalResults = NumberUtils.numberWithoutCommas(matchArr?.[0]);
    }

    if (index === 1) {
      const formattedSecondsString = matchArr?.[0].replace(/\,/g, ".");
      reportStats.totalSeconds = Number.parseFloat(formattedSecondsString);
    }

    index++;
  }

  await statsHandle.dispose();

  return reportStats;
}

async function extractLinks(page: Page) {
  const allOfLinksOnTheFirstPage = await page.evaluate(() => {
    // const alinks = document.querySelectorAll(`a[href^="https"]`);
    const alinks = document.querySelectorAll(`a[href]`);
    const links: string[] = [];
    alinks.forEach((aTag: HTMLAnchorElement) => {
      const hrefLink = aTag.getAttribute("href");
      if (hrefLink) {
        links.push(hrefLink);
      }
    });
    return links;
  });
  return allOfLinksOnTheFirstPage;
}

async function extractAdwords(page: Page) {
  const totalNumberOfAds = await page.evaluate(() => {
    const adsInCenterCol = document.querySelectorAll(
      `#tvcap div[data-text-ad]`
    );
    const adsInRightSide = document.querySelectorAll(
      "div[data-pla] div[data-hveid]"
    );
    return adsInCenterCol?.length ?? 0 + adsInRightSide?.length ?? 0;
  });
  return totalNumberOfAds;
}

/**
 *
 * @param browser a Puppeteer broswer instance
 * @param sanitizedKeyword a keyword which is sanitized already
 * @returns a KeywordReport body
 */

async function searchGoogleWithKeywordsByPuppeteer(
  browser: Browser,
  sanitizedKeyword: string
): Promise<Omit<KeywordReport, "id" | "owner">> {
  try {
    const page = await browser.newPage();
    const querystring = encodeURI(sanitizedKeyword);
    await page.goto("https://google.com/search?q=" + querystring, {
      waitUntil: "networkidle2",
    });

    const stats = await extractKeywordReportStats(page);
    const links = await extractLinks(page);
    const totalAds = await extractAdwords(page);
    const htmlHandle = await page.$("html");
    const html = await page.evaluate((htmlEl) => htmlEl.outerHTML, htmlHandle);
    await htmlHandle.dispose();

    return {
      html,
      links,
      status: KeywordReportStatus.DONE,
      keyword: sanitizedKeyword,
      totalResults: stats.totalResults,
      totalSeconds: stats.totalSeconds,
      totalAdwords: totalAds,
    };
  } catch (error) {
    return {
      links: [],
      status: KeywordReportStatus.FAILED,
      keyword: sanitizedKeyword,
    };
  }
}

async function getUserKeywordReports(userId: string, q?: string) {
  const reports = await KeywordReportRepo.findUserKeywordReports(userId);
  return q
    ? reports.filter(
        (r) => r.keyword.toLowerCase().trim().normalize().includes(q) // NOTE: should imple full-text search
      )
    : reports;
}

async function getReportDetail(reportId: string, userId: string) {
  return await KeywordReportRepo.findKeywordReportDetail(reportId, userId);
}

export default {
  getReportDetail,
  getUserKeywordReports,
  searchGoogleWithKeywordsByPuppeteer,
} as const;
