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