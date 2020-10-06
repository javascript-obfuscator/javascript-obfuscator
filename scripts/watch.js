#!/usr/bin/env node

const shell = require('shelljs');

shell.exec('$(yarn bin)/webpack --config webpack/webpack.node.config.js --mode development --watch --colors true');