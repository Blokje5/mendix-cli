const https = require('https');
const settings = require(__base + 'settings');
const logger = require(__base + 'logger/logger.js');
/**
 * Wrapper for the HTTPS library, provides utility
 * functions for request to the mendix API
 */
class HTTPS {
    /**
     * default constructor
     */
    constructor() {

    }
    /**
     * Calls a method, adding the mendix authorisation headers
     * @param {string} host - Host name
     * @param {string} path - Path on host
     * @param {string} HTTPmethod - HTTP method
     * @param {function} onResult - callback function, with JSON response
     */
    request(host, path, HTTPmethod, onResult) {
        let options = this._options(host, path, HTTPmethod);
        let request = https.request(options, (result) => {
            let output = '';

            result.on('data', (input) => {
                output+=input;
            });

            result.on('end', () => {
                let obj = JSON.parse(output);
                if (result.statusCode !== 200) {
                    err = {
                        status: result.statusCode,
                        message: obj,
                    };
                    throw err;
                }
                onResult(obj);
            });
        });
        request.on('error', (err) => logger.error(err));
        request.end();
    }
    /**
     * private function for returning an options object for requests
     * @param {string} host - Host name
     * @param {string} path - Path on host
     * @param {string} HTTPmethod - HTTP method
     * @return {object} - options object
     */
    _options(host, path, HTTPmethod) {
        let options = {
            host: host,
            path: path,
            method: HTTPmethod,
            headers: {
                'Content-Type': 'application/json',
                'Mendix-Username': settings.email,
                'Mendix-ApiKey': settings.apiKey,
            },
        };
        return options;
    }
}

module.exports = new HTTPS();
