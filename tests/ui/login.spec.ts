import { test, expect } from '../../fixtures/test-fixtures';
import {LoginPage} from '../../pages/LoginPage';
import {users} from '../../test-data/users';

test('valid user should be able to login successfully', async ({page, loginPage}) => {
    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL('/inventory.html');
});

test('invalid user should see login error', async ({page, loginPage})=>{
    await loginPage.open();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await expect(loginPage.errorMessage).toBeVisible();
});

test('locked-out user should not be able to login', async ({page,loginPage,}) => {
  await loginPage.open();
  await loginPage.login(users.lockedOutUser.username,users.lockedOutUser.password);
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  await expect(page).not.toHaveURL(/inventory\.html/);
});
