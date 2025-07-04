import { type Locator, type Page, expect } from '@playwright/test';

export class BookPage {

    readonly page: Page;
    private readonly rightColumn;
    private readonly rightColumnLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.rightColumnLocator = page.locator(`//div[@class='BookPage__rightColumn']`);

        this.rightColumn = {
            bookTitle: this.rightColumnLocator.locator(`//div[@class='BookPageTitleSection']`),
        }
    }

    async expectBookTitleVisible(expectedTitle: string) {
        await expect(this.rightColumn.bookTitle).toBeVisible();
        const actualTitle = await this.rightColumn.bookTitle.textContent();
        expect(actualTitle).toContain(expectedTitle);
        console.log(`Book title is visible and contains: ${expectedTitle}`);
    }    

}