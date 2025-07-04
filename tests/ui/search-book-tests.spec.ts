import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import data  from '../../taf/test-data/env-test-data';
import { HomePage } from '../../taf/page-objects/home-page';
import { BookPage } from '../../taf/page-objects/book-page';

test.describe.configure({ mode: 'parallel' });

const URL = data.testData.baseURL;
const books = data.testData.books;

test('Search for book and validate that correct book card is opend', async ({ page }) => {

    const book = faker.helpers.arrayElement(books);
    const bookTitle = book.title;
    
    await test.step('User navigates to a search page', async () => {
        await page.goto(URL, { timeout: 60000 });
        await expect.soft(page).toHaveURL(URL);
        const homePage = await new HomePage(page);
        await homePage.clickCloseModalIfExists();
    });

    await test.step('User types the book title into search bar and sees dropdown with serach results', async () => {
        const homePage = await new HomePage(page);        
        await homePage.typeBookNameInASerchBar(bookTitle);
        await homePage.expectSearchResultsToBeDisplayed();
    });

    await test.step(`User clicks on the dropdown line and navigates to a book card page `, async () => {
        const homePage = await new HomePage(page);
        await homePage.clickOnBookFromSearchResults(bookTitle);
        const bookPage = await new BookPage(page);
        await bookPage.expectBookTitleVisible(bookTitle);
    });
});



