"use strict";

import { JavaScriptObfuscator } from './src/JavaScriptObfuscator';

if (!global._babelPolyfill) {
    require('babel-polyfill');
}

module.exports = JavaScriptObfuscator;
