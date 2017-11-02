const prettyjson = require('prettyjson');

const https = require(__base + 'http/http.js');
const settings = require(__base + 'settings');

/**
 * Wrapper for the mendix DeployAPI
 */
class DeployAPI {
    /**
     * Constructs a DeployAPI wrapper object
     * @param {*} https http implementation
     */
    constructor(https) {
        this.https = https;
        this.host = 'deploy.mendix.com';
    }

    /**
     * retrieves all apps available to your account
     */
    retrieveApps() {
        let path = '/api/1/apps/';
        this.https.request(this.host, path, 'GET', (result) => {
            console.log(prettyjson.render(result, null));
        });
    }

    /**
     * Retrieve current available environments and their status
     */
    retrieveEnvironments() {
        let path = '/api/1/apps/'+settings.projectName+'/environments/';
        this.https.request(this.host, path, 'GET', (result) => {
             console.log(prettyjson.render(result, null));
         });
    }
}

module.exports = new DeployAPI(https);
