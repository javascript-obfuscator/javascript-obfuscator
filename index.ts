"use strict";

import 'reflect-metadata';
import { JavaScriptObfuscator } from './src/JavaScriptObfuscator';

if (!(<any>global)._babelPolyfill) {
    require('babel-polyfill');
}

module.exports = JavaScriptObfuscator;
