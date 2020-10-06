#!/usr/bin/env node

const shell = require('shelljs');

shell
    .exec('yarn run eslint')
    .exec('yarn test');