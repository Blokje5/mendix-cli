const https = require('https');
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
     * @param {function} onResult - callback function, with status code
     *  and JSON response
     */
    request(host, path, HTTPmethod, onResult) {
        let options = _options(host, path, HTTPmethod);
        https.request(options, (result) => {
            let output = '';

            result.on('data', (input) => {
                output+=input;
            });

            result.on('end', () => {
                let obj = JSON.parse(output);
                onResult(result.statusCode, obj);
            });
        })
        .catch((err) => console.log(err));
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
                'Mendix-Username': 'TODO', // TODO
                'Mendix-ApiKey': 'TODO', // TODO
            },
        };
        return options;
    }
}

module.exports = HTTPS;
