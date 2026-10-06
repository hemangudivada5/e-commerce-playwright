import {Page,Locator} from '@playwright/test';
import {ProductCard} from '../components/ProductCard';

export class ProductsPage{
    readonly page: Page;
    readonly productCards: Locator;
    readonly cartLink: Locator;
    readonly setDropdown: Locator;

    constructor(page: Page){
        this.page = page;
        this.productCards = page.locator('[data-test="inventory-item"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.setDropdown = page.locator('[data-test="product-sort-container"]');
    }
    async getProductCard(productName: string): Promise<ProductCard> {
        const product = this.productCards.filter({ hasText: productName }).first();
        return new ProductCard(product);
    }
    async getCartItemCount(): Promise<number> {
        const cartBadge = this.cartLink.locator('.shopping_cart_badge');

        const count = await cartBadge.textContent();

        return Number(count?.trim() ?? 0);
    }
    async openCart(): Promise<void> {
        await this.cartLink.click();
    }
    async sortBy(option: string):  Promise<void> {
        await this.setDropdown.selectOption(option);
    }
    async getProductPrices(): Promise<number[]> {
        const prices = await this.productCards.locator('[data-test="inventory-item-price"]').allTextContents(); 
        return prices.map(price => Number(price.replace('$', '').trim()));
    }
    async getProductNames(): Promise<string[]> {
        const names = await this.productCards.locator('[data-test="inventory-item-name"]').allTextContents();
        return names.map(names => names.trim());
    }
}

