const prompt = require('prompt');
const {promisify} = require('util');

prompt.message = '';
prompt.delimeter = '';
// define a prompter
class Prompter {
    
    constructor(prompter, schema) {
        this.prompter = prompter;
        this._get = promisify(prompter.get);
        this.schema = schema;
    }

    async userInput() {
        this.prompter.start();

        let result = await this._get(this.schema).then((result) => {
            return result;
        }).catch((err) => console.log(err));
        
        return result;
    }
}

//define the schema
const schema = {
    properties: {
        email: {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Provide your mendix developer account',
            required: true
        },
        apiKey: {
            message: 'Provide your API key',
            required: true
        },
        projectName: {
            default: ''
        },
        branch: {
            default: 'trunk'
        }
    }
}



module.exports = new Prompter(prompt, schema);