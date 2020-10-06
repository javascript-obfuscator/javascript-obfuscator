#!/usr/bin/env node

const shell = require('shelljs');

shell.exec('$(yarn bin)/ts-node --type-check test/dev/dev.ts');