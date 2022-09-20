import puppeteer from "puppeteer";
import type { Browser } from "puppeteer";

async function launchBrowserInstance(): Promise<Browser> {
  return await puppeteer.launch({
    headless: false,
    slowMo: 1000,
  });
}

export default {
  launchBrowserInstance,
} as const;
