import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('[data-test="inventory-item"]');

    this.continueShoppingButton = page.getByRole('button',{ name: 'Continue Shopping' });

    this.checkoutButton = page.getByRole('button',{ name: 'Checkout' });
  }
  async getCartItem(productName: string): Promise<Locator> {
  return this.cartItems
    .filter({ hasText: productName })
    .first();
}
async getProductName(productName: string): Promise<string> {
  const cartItem = await this.getCartItem(productName);

  return (await cartItem
    .locator('[data-test="inventory-item-name"]')
    .textContent())?.trim() ?? '';
}
async removeProduct(productName: string): Promise<void> {
  const cartItem = await this.getCartItem(productName);

  await cartItem
    .getByRole('button', { name: 'Remove' })
    .click();
}
async getCartItemCount(): Promise<number> {
  return await this.cartItems.count();
}
async proceedToCheckout(): Promise<void> {
  await this.checkoutButton.click();
}
}