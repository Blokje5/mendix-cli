const https = require(__base + 'http/http.js');
const settings = require(__base + 'settings');
const prettyjson = require('prettyjson');

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
        let path = '/api/1/apps/'+settings.projectName+'/branches/';
        this.https.request(this.host, path, 'GET', (result) => {
            console.log(prettyjson.render(result, null));
        });
    }
}

module.exports = new TeamServerAPI(https);
