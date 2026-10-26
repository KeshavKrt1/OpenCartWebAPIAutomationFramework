import { Locator } from "@playwright/test";

export class Cart {

 //private locators:
    private readonly LogoutLink: Locator;

   
    async isLogoutLinkExist(): Promise<boolean> {
        return await this.LogoutLink.isVisible();
    }

}