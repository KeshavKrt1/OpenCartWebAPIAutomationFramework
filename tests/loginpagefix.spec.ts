
import { CsvHelper } from '../src/utils/CsvHelper';
import { test, expect } from '../src/fixtures/pagefixtures';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

import * as allure from "allure-js-commons";
import { meta, log, testData } from 'reporting-labs';
import { BasePage } from '../src/pages/BasePage';



test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
});

//AAA - Arrange, Act, Assert---
test('login page title test', async ({ loginPage }) => {

    meta({ priority: 'P2', severity: 'minor', owner: 'Keshav', story: 'US101', epic: 'ep300', feature: 'F30', issue: 'bug34' });


    let pageTitle = await loginPage.getPageTitle();
    console.log('Login page title:', pageTitle);

    log('Login page title:', pageTitle);
    
    
    expect(pageTitle).toBe('Account Login');
});

test('forgot pwd link exist test', async ({ loginPage }) => {
    meta({ priority: 'P1', severity: 'critical', owner: 'Himanshu', story: 'US102', epic: 'ep300', feature: 'F31', issue: 'bug35' });

    expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test('user is able to login to app with valid credentials', async ({ loginPage, homePage }) => {
    meta({ priority: 'P1', severity: 'blocker', owner: 'Sivaram', story: 'US102', epic: 'ep300', feature: 'F31', issue: 'bug35' });

    await testData({ username: process.env.APP_USERNAME!, password: process.env.APP_PASSWORD! }, 'Login');

    await allure.suite("Login Tests");
    await allure.severity("critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description("Verify user can login with valid credentials");
    
    await allure.step("Login with valid credentials", async () => {
        await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    });
    
    await allure.step("Verify logout link is visible", async () => {
        expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    });

     await allure.step("Verify home page title is visible", async () => {
       expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    });


  
    
});
//Pros:
//light weight, easy to maintain/read, 3rd party lib, no licenses required, flat files, fs, good for large set of testdata
//DO_1: read csv data directly from the CSV file and loop the test method row wise...
let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv');
for (let row of testCSVData) {
    test(`login to app with invalid credentials with CSV data-  ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {
        
        meta({ priority: 'P2', severity: 'major', owner: 'Ajit', story: 'US103', epic: 'ep301', feature: 'F32', issue: 'bug36' });
        await testData(testCSVData, 'Invalid Login Data');
        
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();

    });

};

//Cons:
//1. maintenance
//2. MS Licenses
//3. excel files easily gets corrupt

//DO_2: read xlsx data directly from the excel file and loop the test method row wise...
let testExcelData = ExcelHelper.readExcel('src/testdata/opencarttestdata.xlsx', 'login');
for (let row of testExcelData) {
    test(`login to app with invalid credentials with Excel login data-  ${row.username} - ${row.password}`, async ({ loginPage, homePage }) =>{
        
        meta({ priority: 'P2', severity: 'major', owner: 'Ajit', story: 'US103', epic: 'ep301', feature: 'F32', issue: 'bug36' });
        await testData(testExcelData, 'Invalid Login Data');

        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();

    });

};


//DO_2_1: read xlsx data directly from the excel file - for product data- and loop the test method row wise...
let testExcelProdData = ExcelHelper.readExcel('src/testdata/opencarttestdata.xlsx', 'product');
for (let row of testExcelProdData) {
    test(`verify user is able to land on product page with the help of excel testdata ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, page }) => {
       
           await homePage.doSearch(row.searchkey);
           await searchResultsPage.selectProduct(row.productname);
           expect(await page.title()).toBe(row.productname);
       });

};

//Pros:
//1. inbuilt method: parse, lightweight, smaller data source, super compatible with javascript, easy serialization/de-serialization
//DO_3: read JSON data directly from the JSON file and loop the test method row wise...
let testJSONData = JsonHelper.readJson('src/testdata/logindata.json');
for (let row of testJSONData) {
    test(`login to app with invalid credentials with Json data-  ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {
        
          
        meta({ priority: 'P2', severity: 'major', owner: 'Ajit', story: 'US103', epic: 'ep301', feature: 'F32', issue: 'bug36' });
       await testData(testJSONData, 'Invalid Login Data');
        
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();

    });

};

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