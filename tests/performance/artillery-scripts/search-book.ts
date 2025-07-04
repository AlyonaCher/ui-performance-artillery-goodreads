const {searchBookCommand} = require('../commands/search-book');

async function searchBookArtilleryScript(page, vuContext, events, test)
{   
    const { step } = test;
    await searchBookCommand(page, step);   
}

module.exports = {
    searchBookArtilleryScript
}