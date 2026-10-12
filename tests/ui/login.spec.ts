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