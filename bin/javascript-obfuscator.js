#!/usr/bin/env node

if (!global._babelPolyfill) {
    require('babel-polyfill');
}

require('../dist/index').runCLI(process.argv);