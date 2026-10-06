import{test,expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { users } from '../../test-data/users';
import { CartPage } from '../../pages/CartPage';

test('user should be able to view and add a product to the cart', async ({page})=>{
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
    
    const backpack = await productsPage.getProductCard('Sauce Labs Backpack');
    expect(await backpack.getName()).toBe('Sauce Labs Backpack');

    expect(await backpack.getPrice()).toBe('$29.99');

    await backpack.addToCart();
    expect(await productsPage.getCartItemCount()).toBe(1);
    await productsPage.openCart();

    await productsPage.openCart();
    expect(
  await cartPage.getProductName('Sauce Labs Backpack')
).toBe('Sauce Labs Backpack');
await cartPage.removeProduct('Sauce Labs Backpack');
  expect(await cartPage.getCartItemCount()).toBe(0);

});
test('user should be able to sort products by price low to high', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  await productsPage.sortBy('lohi');

  const prices = await productsPage.getProductPrices();
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
});
test('user should be able to sort products by price high to low', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();

  await loginPage.login(
    users.validUser.username,
    users.validUser.password
  );

  await productsPage.sortBy('hilo');

  const prices = await productsPage.getProductPrices();

  const sortedPrices = [...prices].sort((a, b) => b - a);

  expect(prices).toEqual(sortedPrices);
});
test('user should be able to sort products by name A-Z', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);

    await productsPage.sortBy('az');

    const productNames = await productsPage.getProductNames();
    const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
    expect(productNames).toEqual(sortedNames);
});
test('user should be able to sort products by name Z to A', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  await productsPage.sortBy('za');

  const productNames = await productsPage.getProductNames();

  const sortedNames = [...productNames].sort((a, b) =>b.localeCompare(a));

  expect(productNames).toEqual(sortedNames);
});