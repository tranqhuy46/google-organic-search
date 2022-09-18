import puppeteer from "puppeteer";
import type { RequestHandler } from "express";

const searchForKeyword: RequestHandler = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 1000, // slow down by 1s
  });
  const page = await browser.newPage();
  const querystring = encodeURI("nimble");
  await page.goto("https://google.com/search?q=" + querystring, {
    waitUntil: "networkidle2",
  });
  const bodyHandle = await page.$("body");
  const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
  await bodyHandle.dispose();
  await browser.close();
  res.status(200).send(html);
};

export default {
  searchForKeyword,
} as const;
