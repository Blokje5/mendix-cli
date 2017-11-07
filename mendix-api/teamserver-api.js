const https = require(__base + 'http/http.js');
const settings = require(__base + 'settings');
const logger = require(__base + 'logger/logger.js');

/**
 * Wrapper for the mendix TeamServerAPI
 */
class TeamServerAPI {
    /**
     * Constructs a TeamServerAPI wrapper object
     * @param {*} https http implementation
     */
    constructor(https) {
        this.https = https;
        this.host = 'deploy.mendix.com';
    }

    /**
     * Retrieves all branches avaible to the app
     */
    retrieveBranches() {
        let path = `/api/1/apps/${settings.projectName}/branches/`;
        this.https.request(this.host, path, 'GET', (result) => {
            logger.printJson(result);
        });
    }

    /**
     * Retrieve information of a specific branch
     * @param {string} branchName - Name of the branch
     */
    retrieveBranch(branchName) {
        let branch = encodeURIComponent(branchName);
        let path = `/api/1/apps/${settings.projectName}/branches/${branch}`;
        this.https.request(this.host, path, 'GET', (result) => {
            logger.printJson(result);
        });
    }

    /**
     * Retrieve all revisions of a specific branch
     * @param {string} branchName - Name of the branch
     */
    retrieveRevisions(branchName) {
        let branch = encodeURIComponent(branchName);
        let path = `/api/1/apps/${settings.projectName}/branches/${branch}` +
        `/revisions/`;
        this.https.request(this.host, path, 'GET', (result) => {
            logger.printJson(result);
        });
    }
}

module.exports = new TeamServerAPI(https);
