import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {

    readonly page: Page;
    private readonly topMenuSection;
    private readonly siteHeader: Locator;
    private readonly closeModalButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.siteHeader = this.page.locator(`//header`);
        this.topMenuSection = {
            myBooks: this.siteHeader.getByRole('link', { name: 'My Books' }),
            profileIcon: this.siteHeader.locator(`//div[contains(@class,'dropdown--profileMenu')]`),
            searchInput: this.page.locator(`//input[@placeholder="Search books"]`),
            booksList: this.page.locator(`//div[contains(@class,"gr-bookSearchResults")]`),
            bookTitleListElement: this.page.locator(`//div[contains(@class,"gr-bookSearchResults__item")]`),
        };
        this.closeModalButton = this.page.locator(`//div[@class='modal__close' and ancestor ::div[contains(@class,'modal--centered')]]`);
    }

    async searchForBook(bookTitle: string) {
        await this.topMenuSection.searchInput.fill(bookTitle);
        console.log(`Search input filled with: ${bookTitle}`);
        const bookListElement = await this.topMenuSection.bookTitleListElement.filter({ hasText: bookTitle });
        await bookListElement.first().click();
        console.log(`Book with title "${bookTitle}" clicked in search results`);
    }


    async typeBookNameInASerchBar(bookTitle: string) {
        await this.topMenuSection.searchInput.type(bookTitle);
        console.log(`Search input filled with: ${bookTitle}`);       
    }

    async expectSearchResultsToBeDisplayed() {
        await expect(this.topMenuSection.booksList.first()).toBeVisible({ timeout: 10000 });
        console.log('Search results are displayed');
    }

    async clickOnBookFromSearchResults(bookTitle: string) {
        const bookListElement = this.topMenuSection.bookTitleListElement.filter({ hasText: bookTitle });
        await bookListElement.first().click();
        console.log(`Book with title "${bookTitle}" clicked from search results`);
    }

    //click close modal if exists
    async clickCloseModalIfExists() {
        const closeModalButtonVisible = await this.closeModalButton.isVisible();
        if (closeModalButtonVisible) {
            await this.closeModalButton.click();
            console.log('Close modal button clicked');
        } else {
            console.log('Close modal button not visible, skipping click');
        }
    }

}