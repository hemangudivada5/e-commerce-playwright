
import { test, expect } from '../../fixtures/test-fixtures';
import { users } from '../../test-data/users';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(
    users.validUser.username,
    users.validUser.password
  );
});

test('checkout should show an error when first name is empty', async ({
  page,
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.continueToOverview();

  expect(await checkoutPage.getErrorMessage()).toBe(
    'Error: First Name is required'
  );
});

test('checkout should show an error when last name is empty', async ({
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation('Hemanth', '', '');
  await checkoutPage.continueToOverview();

  expect(await checkoutPage.getErrorMessage()).toBe(
    'Error: Last Name is required'
  );
});

test('checkout should show an error when postal code is empty', async ({
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation('Hemanth', 'Gudivada', '');
  await checkoutPage.continueToOverview();

  expect(await checkoutPage.getErrorMessage()).toBe(
    'Error: Postal Code is required'
  );
});

test('user should proceed to checkout overview with valid information', async ({
  page,
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation('Hemanth', 'Gudivada', '520001');
  await checkoutPage.continueToOverview();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
});

test('user should be able to place an order successfully', async ({
  page,
  productsPage,
  cartPage,
  checkoutPage,
  checkoutOverviewPage,
  orderConfirmationPage,
}) => {
  // Add product to cart
  const backpack = await productsPage.getProductCard('Sauce Labs Backpack');

  await backpack.addToCart();
  await productsPage.openCart();

  // Proceed to checkout
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation('Hemanth', 'Gudivada', '520001');
  await checkoutPage.continueToOverview();

  // Verify order contents
  expect(await checkoutOverviewPage.getProductNames()).toEqual([
    'Sauce Labs Backpack',
  ]);

  expect(await checkoutOverviewPage.getSubtotal()).toBe(29.99);
  expect(await checkoutOverviewPage.getTax()).toBe(2.4);
  expect(await checkoutOverviewPage.getTotal()).toBe(32.39);

  // Place order
  await checkoutOverviewPage.finishOrder();

  // Verify confirmation
  expect(await orderConfirmationPage.getConfirmationHeading()).toBe(
    'Thank you for your order!'
  );

  expect(await orderConfirmationPage.getConfirmationMessage()).toContain(
    'Your order has been dispatched'
  );

  // Return to Products
  await orderConfirmationPage.backHome();

  await expect(page).toHaveURL(/inventory/);
});
