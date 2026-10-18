import { test, expect } from '../../fixtures/test-fixtures';
import { ProductDiscoveryPage } from '../../pages/ProductDiscoveryPage';
test.beforeEach(async ({ page }) => {
  await page.route('https://pagead2.googlesyndication.com/**',
    (route) => route.abort()
  );

  await page.route('https://googleads.g.doubleclick.net/**',
    (route) => route.abort()
  );
});
test.describe('Product discovery - Automation Exercise', () => {
  test('search should display matching products', async ({ page, productDiscoveryPage  }) => {
    const productsPage = productDiscoveryPage;

    await productsPage.open();
    await productsPage.searchForProduct('Blue Top');

    await expect(productsPage.searchedProductsHeading).toBeVisible();

    const names = await productsPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names.every((name) =>name.toLowerCase().includes('blue top'))).toBeTruthy();
  });

  test('category selection should display category products', async ({
    page, productDiscoveryPage 
  }) => {
    const productsPage = productDiscoveryPage;

    await productsPage.open();
    await productsPage.selectCategory('/category_products/1');

    await expect(page).toHaveURL(/\/category_products\/1$/);

    await expect(page.getByRole('heading', {name: /women - dress products/i,})).toBeVisible();

    const names = await productsPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names.some((name) => name.includes('Sleeveless Dress'))).toBeTruthy();});

  test('brand selection should display brand products', async ({
    page, productDiscoveryPage
  }) => {
    const productsPage = productDiscoveryPage;

    await productsPage.open();
    await productsPage.selectBrand('Polo');

    await expect(page).toHaveURL(/\/brand_products\/Polo$/);

    await expect(page.getByRole('heading', {name: /brand - polo products/i,})).toBeVisible();

    const names = await productsPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain('Blue Top');
  });
test('search should return no products for an unmatched term', async ({
  page, productDiscoveryPage 
}) => {
  const productsPage = productDiscoveryPage;

  await productsPage.open();

  const unmatchedTerm = `no-such-product-${Date.now()}`;

  await productsPage.searchForProduct(unmatchedTerm);

  await expect(
    productsPage.searchedProductsHeading
  ).toBeVisible();

  const names = await productsPage.getProductNames();

  expect(names).toHaveLength(0);
});

});
