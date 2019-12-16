const puppeteer = require('puppeteer');

const APP_URL = 'https://59iox.csb.app/';
const HOVERED_ELEMENT_SELECTOR = '#line';

const makeScreenshot = async (headless) => {
  const hash = +new Date();
  const screenshotSuffix = headless ? 'headless' : 'nonHeadless';

  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();

  await page.goto(APP_URL);

  const element = await page.$(HOVERED_ELEMENT_SELECTOR);

  await element.hover();
  await page.waitFor(200);
  await element.screenshot({
    path: `./screenshots/${hash}-${screenshotSuffix}.png`,
  });

  await browser.close();
};

module.exports = makeScreenshot;
