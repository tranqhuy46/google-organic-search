import type { Browser } from "puppeteer";

async function searchGoogleWithKeywordsByPuppeteer(
  browser: Browser
): Promise<string> {
  const page = await browser.newPage();
  const querystring = encodeURI("nimble");
  await page.goto("https://google.com/search?q=" + querystring, {
    waitUntil: "networkidle2",
  });
  const bodyHandle = await page.$("body");
  const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
  await bodyHandle.dispose();
  await browser.close();
  return html;
}

export default { searchGoogleWithKeywordsByPuppeteer } as const;
