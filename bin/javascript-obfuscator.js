#!/usr/bin/env node

require('../dist/index').runCLI(
    process.argv,
    process.stdin,
    process.stdout
);