import { Page, expect } from '@playwright/test';
import data  from '../../../taf/test-data/env-test-data.ts';
import { HomePage } from '../../../taf/page-objects/home-page.ts';
import { BookPage } from '../../../taf/page-objects/book-page.ts';
import { faker } from '@faker-js/faker';

const URL = data.testData.baseURL;
const books = data.testData.books;

export async function searchBookCommand(page: Page, step) {
    const book = faker.helpers.arrayElement(books);
    const bookTitle = book.title;

    await step('Step_1_Landing_main_page', async () => {
        await console.log(`Step 1: Landing main page '${URL}'`);
        await page.goto(URL, { timeout: 60000 });
        await expect.soft(page).toHaveURL(URL);
        const homePage = await new HomePage(page);
        await homePage.clickCloseModalIfExists();
        
    });

    await step('Step_2_typing_into_search_field', async () => {
        await console.log('Step 2: Typing into search field');
        const homePage = await new HomePage(page);        
        await homePage.typeBookNameInASerchBar(bookTitle);
        await homePage.expectSearchResultsToBeDisplayed();
    });

    await step('Step_3_Clicking_on_search_results', async () => {
        await console.log('Step 3: Clicking on search results');
        const homePage = await new HomePage(page);
        await homePage.clickOnBookFromSearchResults(bookTitle);
        const bookPage = await new BookPage(page);
        await bookPage.expectBookTitleVisible(bookTitle);
    });
   
}

