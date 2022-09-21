import puppeteer from "puppeteer";
import env_var from "../shared/env_var";
import type { Browser } from "puppeteer";

async function launchBrowserInstance(): Promise<Browser> {
  return await puppeteer.launch({
    // headless: env_var.nodeEnv === "production",
    headless: true,
    // slowMo: env_var.nodeEnv === "production" ? undefined : 500,
  });
}

export default {
  launchBrowserInstance,
} as const;
