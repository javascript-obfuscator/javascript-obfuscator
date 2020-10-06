#!/usr/bin/env node

const shell = require('shelljs');

shell.exec('$(yarn bin)/mocha --require ts-node/register --require source-map-support/register test/index.spec.ts --colors  --exit');