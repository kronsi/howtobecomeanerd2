import puppeteer from "puppeteer";
const sleep = require("sleep-promise");

class Crawler {
  constructor() {
    this.browser = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
        browser: "chrome",
        //channel: "chrome-dev",                
        headless: false,
        args: ['--no-sandbox', '--no-sand ox', '--enable-features=NetworkService', '--ignore-certificate-errors', '--disable-web-security', '--disable-setuid-sandbox'],
        userDataDir: "./user_data"
    });
  }

  async crawl(url, customer) {
    if (!this.browser) {
      throw new Error("Browser not initialized. Call init() first.");
    }
    const page = await this.browser.newPage();
    
    await page.goto(url);
    await page.setViewport({width: 1920, height: 1024});
    await sleep(2000);
    await page.$eval('input.form-text-field__input', (el, value) => el.value = value, customer);
    await sleep(2000);
    await page.click('button.cta-button--primary');
    await sleep(2000);
    const tabButtons = await page.$$('button.tab-button');
    console.log("tabButtons.lenght:",  tabButtons.length);
    for (let i = 0; i < tabButtons.length; i++) {
      const tabButton = tabButtons[i];
      const buttonText = await page.evaluate(el => el.textContent, tabButton);
      console.log("buttonText:", buttonText);
      if (buttonText.indexOf("Aussteller") > -1) {
        await tabButton.click();
        break;
      }
    }
    const cards = await page.$$('div.teaser-tile__title');
    console.log("cards.length:", cards.length);
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      await card.click();
      console.log("card clicked:", i);
      break
    }
    //await page.keyboard.press('Enter');
    await sleep(5000);
    const content = await page.content();
    //await page.close();
    return content;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

const startProcess = async () => {
    const crawler = new Crawler();
    await crawler.init();
    await crawler.crawl("https://www.prowein.de/vis/v1/de/search?ticket=g_u_e_s_t&_query=&f_type=profile", "San Marzano");
};

startProcess();