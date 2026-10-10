import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { users } from '../../test-data/users';

test('checkout should show an error when first name is empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.continueToOverview();

  expect(await checkoutPage.getErrorMessage()).toBe('Error: First Name is required');
});
test('checkout should show an error when last name is empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation('Hemanth', '', '');
  await checkoutPage.continueToOverview();

  expect(await checkoutPage.getErrorMessage()).toBe('Error: Last Name is required');
});
test('checkout should show an error when postal code is empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation('Hemanth','Gudivada','');

  await checkoutPage.continueToOverview();

  expect(await checkoutPage.getErrorMessage()).toBe('Error: Postal Code is required');
});
test('user should proceed to checkout overview with valid information', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation('Hemanth','Gudivada','520001');

  await checkoutPage.continueToOverview();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
});