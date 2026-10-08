import {Locator} from '@playwright/test';
import {ProductsPage} from '../pages/ProductsPage';

export class ProductCard {
  readonly container: Locator;
  readonly productName: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
    constructor(container: Locator) {
    this.container = container;
    this.productName = container.locator('[data-test="inventory-item-name"]');
    this.price = container.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = container.getByRole('button',{ name: /add to cart/i });
  }
  async getName(): Promise<string> {
    return (await this.productName.textContent())?.trim() ?? '';
  }

  async getPrice(): Promise<string> {
    return (await this.price.textContent())?.trim() ?? '';
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
  async openDetails(): Promise<void> {
  await this.productName.click();
}
}


