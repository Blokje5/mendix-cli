#!/usr/bin/env node
global.__base = __dirname + '/';

const commander = require('commander');
const init = require(__base + 'init/init.js');


commander
  .command('init')
  .description('initializes the configuration file')
  .action(() => {
      init();
    });

commander
  .command('apps')
  .description('retrieves all available apps')
  .action(() => {
    const deploy = require(__base + 'mendix-api/deploy-api.js');
    deploy.retrieveApps();
  });

commander
  .command('environments')
  .description('retrieves all available environments')
  .action(() => {
    const deploy = require(__base + 'mendix-api/deploy-api.js');
    deploy.retrieveEnvironments();
  });

commander.parse(process.argv);
