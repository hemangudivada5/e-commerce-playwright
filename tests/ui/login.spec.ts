import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';
import {users} from '../../test-data/users';

test('valid user should be able to login successfully', async ({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL('/inventory.html');
});

test('invalid user should see login error', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await expect(loginPage.errorMessage).toBeVisible();
});