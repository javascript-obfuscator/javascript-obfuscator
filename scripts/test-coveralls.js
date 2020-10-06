#!/usr/bin/env node

const shell = require('shelljs');

shell
    .exec('yarn run test:mocha')
    .exec('$(yarn bin)/nyc report --reporter=text-lcov | $(yarn bin)/coveralls');