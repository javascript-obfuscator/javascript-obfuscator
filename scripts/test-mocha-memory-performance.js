#!/usr/bin/env node

const shell = require('shelljs');

shell.exec('NODE_OPTIONS=--max-old-space-size=220 $(yarn bin)/mocha --require ts-node/register test/performance-tests/JavaScriptObfuscatorMemory.spec.ts');