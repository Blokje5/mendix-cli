const prettyjson = require('prettyjson');
const winston = require(__base + 'logger/winston.js');
/**
 * Customized Logger
 */
class Logger {
    /**
     * Constructs a customized Logger, using a log implementation
     * @param {*} logger - Log implementation
     */
    constructor(logger) {
        this.logger = logger;
    }
    /**
     * Log an error to the console
     * @param {Error} error - error thrown by node process
     */
    error(error) {
        error.message = error.message = '\n' + error.stack;
        this.logger.error(error);
    }

    /**
     * Log an informative message to the console
     * @param {string} message - message to log
     */
    info(message) {
        this.logger.info(message);
    }

    /**
     * Log a verbose message to the console.
     * @param {string} message - message to log
     */
    verbose(message) {
        this.logger.verbose(message);
    }


    /**
     * Prints a message directtly to the console.
     * @param {string} message - message to log directly to console
     */
    printOut(message) {
        console.log(message);
    }
    /**
     * Pretty prints a json object to the console
     * @param {object} jsonObject - Json object to print
     */
    printJson(jsonObject) {
        let options = {
            keysColor: 'green',
        };
        console.log(prettyjson.render(jsonObject, options));
    }
}

module.exports = new Logger(winston);
