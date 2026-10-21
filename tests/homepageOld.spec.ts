import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';


let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('test1@test122.com', 'pw123');
    homePage = new HomePage(page);
});

test.skip('home page title test', async () => {

    let homePageTitle = await homePage.getHomePageTitle();
    console.log('home page title:', homePageTitle);
    expect(homePageTitle).toBe('My Account');

});

test.skip('logout link exist test', async () => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();

});

test.skip('home page headers exists test', async () => {
    let allHeaders = await homePage.getHomePageHeaders();
    console.log('home page headers:', allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
});