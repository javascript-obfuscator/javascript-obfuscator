#!/usr/bin/env node

const shell = require('shelljs');

shell.exec('opencollective') || shell.exit(0);