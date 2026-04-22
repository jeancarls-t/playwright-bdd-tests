const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

const BASE_URL = 'https://demowebshop.tricentis.com';

class CustomWorld {
  constructor({ parameters }) {
    // Detectar si estamos en CI (GitHub Actions)
    const isCI = process.env.CI === 'true';
    // En CI siempre headless, local puede ser headed si se especifica
    this.headed = !isCI && parameters.headed === 'true';
  }

  async init() {
    const browser = await chromium.launch({ 
      headless: !this.headed,  // Si headed=false, headless=true
      timeout: 60000
    });
    this.context = await browser.newContext({
      baseURL: BASE_URL
    });
    this.page = await this.context.newPage();
  }

  async close() {
    if (this.context) {
      await this.context.close();
    }
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.init();
});

After(async function () {
  await this.close();
});