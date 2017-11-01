#!/usr/bin/env node
const commander = require('commander');
const init = require('./init/init.js');

commander
  .command('init')
  .description('initializes the configuration file')
  .action(() => {
      init();
    });

commander.parse(process.argv);
