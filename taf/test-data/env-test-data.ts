import dotenv from 'dotenv';
dotenv.config();

export default {
    testData: {
        baseURL: 'https://www.goodreads.com/search',

        books: [
            {
                title: '2001: A Space Odyssey',
                author: {
                    firstName: 'Arthur C.',
                    lastName: 'Clarke',
                },
            },

            {
                title: '2010: Odyssey Two',
                author: {
                    firstName: 'Arthur C.',
                    lastName: 'Clarke',
                },
            },

            {
                title: '2061: Odyssey Three',
                author: {
                    firstName: 'Arthur C.',
                    lastName: 'Clarke',
                },
            },
            {
                title: '3001: The Final Odyssey',
                author: {
                    firstName: 'Arthur C.',
                    lastName: 'Clarke',
                },
            }
        ]
    }
}