const fs = require('fs');
const path = require('path');
const prompter = require(path.join(__dirname, 'prompter.js'));

// TODO make init depend on prompter
/**
 * Wraps the prompter and uses the user input to create a config.json file
 */
async function init() {
    console.log('We need some information to setup a configuration fileˇ');
    let result = await prompter.userInput()
                                 .catch((err) => console.log(err));

    let json = JSON.stringify(result, null, 4);
    fs.writeFile('settings.json', json, 'utf8', () => {
        console.log('succesfull initialization');
    });
}

module.exports = init;

init();
