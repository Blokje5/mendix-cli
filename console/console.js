const commander = require('commander');
const init = require(__base + 'init/init.js');
const settings = require(__base + 'settings');


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

commander
  .command('branches')
  .description('retrieves all available branches')
  .action(() => {
    const team = require(__base + 'mendix-api/teamserver-api.js');
    team.retrieveBranches();
  });

commander
  .command('branch [branch]')
  .description('retrieves information on a specific branch')
  .action((branch) => {
    const team = require(__base + 'mendix-api/teamserver-api.js');
    if (branch === undefined) {
      team.retrieveBranch(settings.branch);
    } else {
      team.retrieveBranch(branch);
    }
  });

commander
  .command('revisions [branch]')
  .description('retrieves all available revisions')
  .action((branch) => {
    const team = require(__base + 'mendix-api/teamserver-api.js');
    if (branch === undefined) {
        team.retrieveRevisions(settings.branch);
      } else {
        team.retrieveRevisions(branch);
      }
  });

module.exports = commander;
