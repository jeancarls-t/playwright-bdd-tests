class HomePage {
  constructor(page) {
    this.page = page;
    this.welcomeMessage = page.locator('.topic-block-title');
  }

  async getWelcomeMessage() {
    return this.welcomeMessage;
  }

  async goToCategory(category) {
    await this.page.goto(`/${category.toLowerCase()}`);
  }

  async addToCart(product) {
    await this.page.locator('.product-item', { hasText: product }).locator('input[value="Add to cart"]').click();
    await this.page.waitForSelector('.ajax-loading-block-window', { state: 'hidden' });
  }

  async goToCart() {
    await this.page.locator('.cart-label').first().click();
  }
}

module.exports = { HomePage };