
import { test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test('verify product header', async ({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductHeader()).toBe('MacBook Pro');
    
});

test('verify product images count', async ({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductImagesCount()).toBe(4);
    console.log('Images count is:', await productInfoPage.getProductImagesCount());
    
});

test('verify product information/data', async ({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');

    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Actual Product Details:', actualProductInfoMap);

    expect.soft(actualProductInfoMap.get('productheader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('productImagesCount')).toBe(4);
    
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
    
    expect.soft(actualProductInfoMap.get('product price:')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('external tax price:')).toBe('$2,000.00');
  
});

// common features test:

test('App logo exists on the login page', async ({ basePage }) => {
    
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('Search Box exists on login page', async ({ basePage }) => {
    
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('Cart exists on login page', async ({ basePage }) => {
    
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test('Footers exists on login page', async ({ basePage }) => {
    
    expect(await basePage.getpageFootersCount()).toBe(16);
    
});