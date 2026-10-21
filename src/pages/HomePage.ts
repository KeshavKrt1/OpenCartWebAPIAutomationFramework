import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export class HomePage extends BasePage {

    //private locators:
    private readonly LogoutLink: Locator;
    private readonly headers: Locator;
    private readonly searchbox: Locator;
    private readonly searchIcon: Locator;

    //constructor of the clss..to initialize the locators:

    constructor(page: Page) {
        super(page);
        this.LogoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });
        this.searchbox = page.getByRole('textbox', { name: 'search' });
        this.searchIcon = page.locator('#search button');
    }

    //page actions:

     async getHomePageTitle(): Promise<String> {
        return await this.page.title();
    }

    async isLogoutLinkExist(): Promise<boolean> {
        return await this.LogoutLink.isVisible();
    }

    async getHomePageHeaders(): Promise<string[]> {
        return await this.headers.allInnerTexts();
    }

    async doSearch(searchKey: string): Promise<void> {
        console.log('search key:', searchKey);
        await this.searchbox.fill(searchKey);
        await this.searchIcon.click();
    }
}