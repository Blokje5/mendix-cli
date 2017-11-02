const prompt = require('prompt');
const {promisify} = require('util');

prompt.message = '';
prompt.delimeter = '';
/**
 * Prompter wraps the prompt library with an async call to retrieve userInput,
 * returning an object containing that object
 */
class Prompter {
    /**
     * @constructor
     * @param {prompt} prompter - implementation of the prompt in nodejs,
     *  uses prompt library
     * @param {schema} schema - schema object definining a set
     * of properties to require with the prompt} prompter
     */
    constructor(prompter, schema) {
        this.prompter = prompter;
        this._get = promisify(prompter.get);
        this.schema = schema;
    }

    /**
     * async wrapper around the prompt library
     * uses promisify to turn prompt into promise
     * @return {object}
     */
    async userInput() {
        console.log('We need some information ' +
        'to setup a configuration file');
        await this.prompter.start();
        let result = await this._get(this.schema).then((result) => {
            return result;
        }).catch((err) => console.log(err));
        return result;
    }
}

// define the schema
const schema = {
    properties: {
        email: {
            // eslint-disable-next-line
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Provide your mendix developer account',
            required: true,
        },
        apiKey: {
            message: 'Provide your API key',
            required: true,
        },
        projectName: {
            default: '',
        },
        branch: {
            default: 'trunk',
        },
    },
};

module.exports = new Prompter(prompt, schema);
