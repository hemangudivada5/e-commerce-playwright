import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { users } from '../../test-data/users';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { OrderConfirmationPage } from '../../pages/OrderConfirmationPage';

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
test('user should be able to place an order successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const overviewPage = new CheckoutOverviewPage(page);
  const confirmationPage = new OrderConfirmationPage(page);

  // Login
  await loginPage.open();

  await loginPage.login(users.validUser.username,users.validUser.password);

  // Add product to cart
  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();

  // Proceed to checkout
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation('Hemanth','Gudivada','520001');

  await checkoutPage.continueToOverview();

  // Verify order contents
  expect(await overviewPage.getProductNames()).toEqual(['Sauce Labs Backpack',]);

  expect(await overviewPage.getSubtotal()).toBe(29.99);
  expect(await overviewPage.getTax()).toBe(2.4);
  expect(await overviewPage.getTotal()).toBe(32.39);

  // Place order
  await overviewPage.finishOrder();

  // Verify confirmation
  expect(await confirmationPage.getConfirmationHeading()).toBe('Thank you for your order!');

  expect(await confirmationPage.getConfirmationMessage()).toContain('Your order has been dispatched');

  // Return to Products
  await confirmationPage.backHome();

  await expect(page).toHaveURL(/inventory/);
});