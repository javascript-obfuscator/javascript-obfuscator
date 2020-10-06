#!/usr/bin/env node

const shell = require('shelljs');

shell.exec('$(yarn bin)/eslint src/**/*.ts --color');