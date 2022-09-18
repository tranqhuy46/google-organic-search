import type { Page } from "puppeteer";

async function setRandomViewPortSize(page: Page) {
  await page.setViewport({
    width: 1024 + Math.floor(Math.random() * 100),
    height: 768 + Math.floor(Math.random() * 100),
  });
}

export { setRandomViewPortSize as randomViewPortSize };
