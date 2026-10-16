
import { Page, Locator } from '@playwright/test';

type CategoryPath =
  | '/category_products/1'
  | '/category_products/2';

export class ProductDiscoveryPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;
  readonly searchedProductsHeading: Locator;
  readonly categorySidebar: Locator;
  readonly brandSidebar: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');

    this.productNames = page.locator(
      '.features_items .productinfo p'
    );

    this.searchedProductsHeading = page.getByRole(
      'heading',
      { name: /searched products/i }
    );

    this.categorySidebar = page.locator('.left-sidebar');
    this.brandSidebar = page.locator('.brands_products');
  }

  async open(): Promise<void> {
    await this.page.goto(
      'https://www.automationexercise.com/products',{ waitUntil: 'domcontentloaded' }
    );
  }

  async searchForProduct(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.productNames.allTextContents();

    return names
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
  }

  async selectCategory(categoryPath: CategoryPath): Promise<void> {
  const categoryLink = this.categorySidebar.locator(
    `a[href="${categoryPath}"]`
  );

  // Expand Women only when the requested subcategory is hidden.
  if (!(await categoryLink.isVisible())) {
    await this.categorySidebar.locator('a[href="#Women"]').click();
  }

  // Click the requested subcategory.
  await categoryLink.click();
}

  async selectBrand(brandName: string): Promise<void> {
    await this.brandSidebar
      .getByRole('link', {
        name: new RegExp(brandName, 'i'),
      })
      .click();
  }
}
