
import { test, expect } from '@playwright/test';
import { json } from 'node:stream/consumers';

//web app --> intercept the network calls and log time..
//**/* --> wildcard pattern for URLs

test('intercept and log requests', async ({ page }) => {
    
    await page.route('**/*', async (route) => {
        console.log(route.request().method(), route.request().url());
        await route.continue(); //url1 -- capture, url2 -- capture...

    });

    //navigate to web app:
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

});


//intercept with mocking:
//mocking: fake data/response

test('mock search page with fake JSON', async ({ page }) => {
    
    //JS
    let fakeProducts = [
        { name: 'Fake macbook Pro', price: '$599' },
        { name: 'Fake iPhone 18', price: '$5999' },
    ];

    //https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook
    await page.route('**/index.php?route=product/search&search=macbook', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts)
        });

    });

    await page.goto('https://abc.com/index.php?route=product/search&search=macbook')

   // await page.pause();

});


test('mock search page with fake HTML', async ({ page }) => {
    
    await page.route('**/index.php?route=product/search&search=macbook', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'text/html',
            body: `
            <html>
            <body>
                <h1>Search Results</h1>
                <div class="product-layout">
                    <h4><a href="#">Fake MacBook Pro</a></h4>
                    <p class="price">$599</p>
                </div>
               <div class="product-layout">
                    <h4><a href="#">Fake iPhone 20</a></h4>
                    <p class="price">$999</p>
                </div>
            </body>
            </html>
            `,                  
            
        });

    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');

    //now assert on the fake HTML:
    const heading = await page.textContent('h1');
    expect(heading).toBe('Search Results');

    const products = await page.locator('.product-layout h4').allTextContents();
    expect(products).toEqual(["Fake MacBook Pro", "Fake iPhone 20"]);


  //  await page.pause();

});