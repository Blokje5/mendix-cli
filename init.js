const fs = require('fs');

const prompter = require('./prompter.js');

// TODO make init depend on prompter
async function init() {
    console.log('We need some information to setup a configuration fileˇ');

    let result = await prompter.userInput();

    let json = JSON.stringify(result, null, 4);
    fs.writeFile('settings.json', json, 'utf8', () => console.log('succesfull initialization'));
}

module.exports = init;

init();