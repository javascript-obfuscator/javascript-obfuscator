#!/usr/bin/env node

if (!global._babelPolyfill && parseInt(process.version.split('.')[0], 10) < 4) {
    require('babel-polyfill');
}

require('../dist/index').runCLI(process.argv);