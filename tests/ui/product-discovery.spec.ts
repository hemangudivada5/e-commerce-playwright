
import { test, expect } from '@playwright/test';
import { ProductDiscoveryPage } from '../../pages/ProductDiscoveryPage';

test.describe('Product discovery - Automation Exercise', () => {
  test('search should display matching products', async ({ page }) => {
    const productsPage = new ProductDiscoveryPage(page);

    await productsPage.open();
    await productsPage.searchForProduct('Blue Top');

    await expect(productsPage.searchedProductsHeading).toBeVisible();

    const names = await productsPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names.every((name) =>name.toLowerCase().includes('blue top'))).toBeTruthy();
  });

  test('category selection should display category products', async ({
    page,
  }) => {
    const productsPage = new ProductDiscoveryPage(page);

    await productsPage.open();
    await productsPage.selectCategory('/category_products/1');

    await expect(page).toHaveURL(/\/category_products\/1$/);

    await expect(page.getByRole('heading', {name: /women - dress products/i,})).toBeVisible();

    const names = await productsPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain('Sleeveless Dress');
  });

  test('brand selection should display brand products', async ({
    page,
  }) => {
    const productsPage = new ProductDiscoveryPage(page);

    await productsPage.open();
    await productsPage.selectBrand('Polo');

    await expect(page).toHaveURL(/\/brand_products\/Polo$/);

    await expect(page.getByRole('heading', {name: /brand - polo products/i,})).toBeVisible();

    const names = await productsPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain('Blue Top');
  });
});
