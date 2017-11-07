#!/usr/bin/env node
global.__base = __dirname + '/';
const commander = require(__base + 'console/console.js');

commander.parse(process.argv);
