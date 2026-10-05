import {Page,Locator} from '@playwright/test';
import {ProductCard} from '../components/ProductCard';

export class ProductsPage{
    readonly page: Page;
    readonly productCards: Locator;
    readonly cartLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.productCards = page.locator('[data-test="inventory-item"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
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
}

