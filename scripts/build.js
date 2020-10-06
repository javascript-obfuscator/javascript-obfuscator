#!/usr/bin/env node

const shell = require('shelljs');

shell
    .exec('yarn run webpack:prod')
    .exec('yarn run eslint')
    .exec('yarn test');