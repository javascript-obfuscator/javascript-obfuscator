#!/usr/bin/env node

const shell = require('shelljs');

shell.exec('$(yarn bin)/ts-node test/dev/dev-runtime-performance.ts');