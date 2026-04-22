const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

const BASE_URL = 'https://demowebshop.tricentis.com';

class CustomWorld {
  constructor({ parameters }) {
    const isCI = process.env.CI === 'true';
    this.headed = !isCI && parameters.headed === 'true';
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async init() {
    this.browser = await chromium.launch({ 
      headless: !this.headed,
      timeout: 60000
    });
    this.context = await this.browser.newContext({
      baseURL: BASE_URL,
      navigationTimeout: 60000
    });
    this.page = await this.context.newPage();
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.init();
});

After(async function () {
  await this.close();
});