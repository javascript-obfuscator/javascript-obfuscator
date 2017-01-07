'use strict';
import { NO_CUSTOM_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

if (!(<any>global)._babelPolyfill) {
    require('babel-polyfill');
}

(function () {
    const JavaScriptObfuscator: any = require("../../index");

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        'var variable = `abc`;',
        {
            ...NO_CUSTOM_NODES_PRESET,
            compact: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
