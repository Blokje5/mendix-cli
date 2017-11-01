#!/usr/bin/env node
const commander = require('commander');
const init = require('./init.js');

commander
  .command('init')
  .description('initializes the configuration file')
  .action(() => {
      init().then(() => console.log('succes'));
    });

commander.parse(process.argv);