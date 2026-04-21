class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart-item-row');
    this.emptyMessage = page.locator('.order-summary-content');
    this.updateCartButton = page.locator('.update-cart-button');
  }

  async goto() {
    await this.page.goto('/cart');
  }

  async getCartItems() {
    return this.cartItems;
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async removeFirstItem() {
    await this.page.locator('.cart-item-row').first().locator('input[name="removefromcart"]').check();
    await this.updateCartButton.click();
    await this.page.waitForTimeout(1000);
  }

  async isEmpty() {
    return this.emptyMessage;
  }
}

module.exports = { CartPage };