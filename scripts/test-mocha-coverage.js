#!/usr/bin/env node

const shell = require('shelljs');

shell.exec('$(yarn bin)/nyc --reporter text-summary yarn run test:mocha');