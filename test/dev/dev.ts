'use strict';
import { NO_CUSTOM_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

if (!(<any>global)._babelPolyfill) {
    require('babel-polyfill');
}

(function () {
    const JavaScriptObfuscator: any = require("../../index");

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            (function(){
                 var foo = 1;
                 var test = function (foo, abc = foo) {
                    return foo, abc;
                 }
            })();
        `,
        {
            ...NO_CUSTOM_NODES_PRESET,
            compact: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
