"use strict";

import '@types/node';

import { JavaScriptObfuscator } from './src/JavaScriptObfuscator';

if (!(<any>global)._babelPolyfill) {
    require('babel-polyfill');
}

module.exports = JavaScriptObfuscator;
