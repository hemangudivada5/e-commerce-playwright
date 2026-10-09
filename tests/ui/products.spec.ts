import{test,expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { users } from '../../test-data/users';
import { CartPage } from '../../pages/CartPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';

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
  const productDetailsPage = new ProductDetailsPage(page);

  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  await productsPage.sortBy('za');

  const productNames = await productsPage.getProductNames();

  const sortedNames = [...productNames].sort((a, b) =>b.localeCompare(a));

  expect(productNames).toEqual(sortedNames);
  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.openDetails();
  
  expect(await productDetailsPage.getName()).toBe('Sauce Labs Backpack');
  expect(await productDetailsPage.getDescription()).toBe(
  'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
);
expect(await productDetailsPage.getPrice()).toBe('$29.99');
await productDetailsPage.goBackToProducts();

await expect(page).toHaveURL(/inventory/);
});
test('user should be able to add multiple products to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  const bikeLight = await productsPage.getProductCard('Sauce Labs Bike Light');

  await backpack.addToCart();
  await bikeLight.addToCart();

  expect(await productsPage.getCartItemCount()).toBe(2);

  await productsPage.openCart();

  expect(await cartPage.getProductName('Sauce Labs Backpack')).toBe('Sauce Labs Backpack');

  expect(await cartPage.getProductName('Sauce Labs Bike Light')).toBe('Sauce Labs Bike Light');
  expect(await cartPage.getProductQuantity('Sauce Labs Backpack')).toBe(1);
expect(await cartPage.getProductQuantity('Sauce Labs Bike Light')).toBe(1);
});
test('user should be able to remove one product and keep the other', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  const bikeLight = await productsPage.getProductCard('Sauce Labs Bike Light');

  await backpack.addToCart();
  await bikeLight.addToCart();

  expect(await productsPage.getCartItemCount()).toBe(2);

  await productsPage.openCart();

  await cartPage.removeProduct('Sauce Labs Backpack');

  expect(await cartPage.getCartItemCount()).toBe(1);

  expect(await cartPage.getProductName('Sauce Labs Bike Light')).toBe('Sauce Labs Bike Light');
});
test('user should be able to continue shopping from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();

  await cartPage.continueShopping();

  await expect(page).toHaveURL(/inventory/);
});
test('user should be able to proceed to checkout from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();

  await cartPage.proceedToCheckout();

  await expect(page).toHaveURL(/checkout-step-one\.html/);
});
