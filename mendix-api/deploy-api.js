const https = require(__base + 'http/http.js');
const settings = require(__base + 'settings');
const logger = require(__base + 'logger/logger.js');
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
            logger.printJson(result);
        });
    }

    /**
     * Retrieve current available environments and their status
     */
    retrieveEnvironments() {
        let path = '/api/1/apps/'+settings.projectName+'/environments/';
        this.https.request(this.host, path, 'GET', (result) => {
            logger.printJson(result);
         });
    }
}

module.exports = new DeployAPI(https);
