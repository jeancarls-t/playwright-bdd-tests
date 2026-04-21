const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

const BASE_URL = 'https://demowebshop.tricentis.com';

class CustomWorld {
  constructor({ parameters }) {
    this.headed = true;  // Modo headed para depurar
  }

  async init() {
    const browser = await chromium.launch({ 
      headless: false,  // Modo headed
      timeout: 60000
    });
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    
    // 🔥 Navegar directamente a la URL completa
    await this.page.goto(BASE_URL + '/login');
    console.log('>>> Página cargada:', await this.page.title());
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