const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const FIXTURES_DIR = path.join(process.cwd(), 'fixtures');

if (!fs.existsSync(FIXTURES_DIR)) {
  fs.mkdirSync(FIXTURES_DIR, { recursive: true });
}

// ==================== REGISTER ====================
Given('que el usuario está en la página de registro', async function () {
  await this.page.goto('https://demowebshop.tricentis.com/register');
  await this.page.waitForTimeout(1000);
});

When('ingresa los siguientes datos:', async function (dataTable) {
  const data = dataTable.rowsHash();
  
  if (data.Email === 'Puan.jerez@test.com') {
    const timestamp = Date.now();
    this.dynamicEmail = `usuario_${timestamp}@test.com`;
    data.Email = this.dynamicEmail;
    fs.writeFileSync(path.join(FIXTURES_DIR, 'dynamic-email.json'), JSON.stringify({ email: this.dynamicEmail }));
    console.log(`>>> Email dinámico generado: ${this.dynamicEmail}`);
  }
  
  if (data.Genero === 'Masculino') {
    await this.page.check('#gender-male');
  } else if (data.Genero === 'Femenino') {
    await this.page.check('#gender-female');
  }
  await this.page.fill('#FirstName', data.Nombre);
  await this.page.fill('#LastName', data.Apellido);
  await this.page.fill('#Email', data.Email);
  await this.page.fill('#Password', data.Password);
  await this.page.fill('#ConfirmPassword', data.Password);
  await this.page.click('#register-button');
});

Then('debería ver el mensaje {string}', async function (message) {
  // Esperar a que la página se estabilice
  await this.page.waitForTimeout(2000);
  
  // Intentar con diferentes selectores
  const selectors = [
    '.topic-block-title',
    '.welcome-message', 
    'h1',
    '.page-title',
    '.header-logo',
    'body'
  ];
  
  for (const selector of selectors) {
    const locator = this.page.locator(selector);
    if (await locator.count() > 0) {
      const text = await locator.first().textContent();
      if (text && text.includes(message)) {
        console.log(`>>> Mensaje encontrado en selector: ${selector}`);
        return;
      }
    }
  }
  
  // Si no encuentra, mostrar el HTML para depurar
  const html = await this.page.content();
  console.log('>>> HTML de la página:', html.substring(0, 500));
  throw new Error(`No se encontró el mensaje: ${message}`);
});

Then('debería ver el mensaje de error {string}', async function (errorMessage) {
  // Esperar a que aparezca el mensaje de error
  await this.page.waitForTimeout(2000);
  
  // 🔥 Selector específico para los errores de login
  const errorLocator = this.page.locator('.validation-summary-errors li');
  
  if (await errorLocator.count() > 0) {
    const text = await errorLocator.first().textContent();
    if (text && text.includes(errorMessage)) {
      console.log(`>>> Error encontrado: ${text}`);
      return;
    }
  }
  
  // Fallback: buscar en cualquier lugar
  const bodyText = await this.page.locator('body').textContent();
  if (!bodyText.includes(errorMessage)) {
    console.log('>>> Texto real del body:', bodyText);
    throw new Error(`No se encontró: "${errorMessage}"`);
  }
});

// ==================== LOGIN ====================
Given('que el usuario está en la página de login', async function () {
  await this.page.goto('https://demowebshop.tricentis.com/login', { timeout: 30000 });
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForTimeout(2000);
  console.log('>>> URL actual:', this.page.url());
});

Given('que el usuario está logueado', async function () {
  let email = 'juan.perez@test.com';
  const fixturePath = path.join(FIXTURES_DIR, 'dynamic-email.json');
  if (fs.existsSync(fixturePath)) {
    const data = JSON.parse(fs.readFileSync(fixturePath));
    email = data.email;
  }
  
  await this.page.goto('/login');
  await this.page.fill('#Email', email);
  await this.page.fill('#Password', 'Password123');
  await this.page.click('.login-button');
  await this.page.waitForTimeout(2000);
});

When('ingresa email {string} y contraseña {string}', async function (email, password) {
  let loginEmail = email;
  const fixturePath = path.join(FIXTURES_DIR, 'dynamic-email.json');
  
  if (email === 'juan.perez@test.com' && fs.existsSync(fixturePath)) {
    const data = JSON.parse(fs.readFileSync(fixturePath));
    loginEmail = data.email;
  }
  
  await this.page.fill('#Email', loginEmail);
  await this.page.fill('#Password', password);
  await this.page.click('.login-button');
  await this.page.waitForTimeout(1000);
});