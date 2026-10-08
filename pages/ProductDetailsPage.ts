import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly removeButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.removeButton = page.getByRole('button',{ name: 'Remove' });
    this.backToProductsButton = page.getByRole('button',{ name: 'Back to products' });
  }
  async getName(): Promise<string> {
  return (await this.productName.textContent())?.trim() ?? '';
}
async getDescription(): Promise<string> {
  return (await this.productDescription.textContent())?.trim() ?? '';
}
async getPrice(): Promise<string> {
  return (await this.productPrice.textContent())?.trim() ?? '';
}
async goBackToProducts(): Promise<void> {
  await this.backToProductsButton.click();
}

}