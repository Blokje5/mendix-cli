const fs = require('fs');
const path = require('path');
const prompter = require(path.join(__dirname, 'prompter.js'));
const logger = require(__base + 'logger/logger.js');

// TODO make init depend on prompter
/**
 * Wraps the prompter and uses the user input to create a config.json file
 */
async function init() {
    let result = await prompter.userInput()
                                 .catch((err) => logger.error(err));

    let json = JSON.stringify(result, null, 4);
    fs.writeFile('settings.json', json, 'utf8', () => {
        logger.printOut('succesfull initialization');
    });
}

module.exports = init;

