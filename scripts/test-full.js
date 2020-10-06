#!/usr/bin/env node

const shell = require('shelljs');

shell
    .exec('yarn run test:dev')
    .exec('yarn run test:mocha-coverage')
    .exec('test:mocha-memory-performance');