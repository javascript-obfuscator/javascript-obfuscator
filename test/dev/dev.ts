'use strict';
import { NO_CUSTOM_NODES_PRESET } from '../../src/preset-options/NoCustomNodesPreset';

if (!(<any>global)._babelPolyfill) {
    require('babel-polyfill');
}

(function () {
    const JavaScriptObfuscator: any = require("../../index");

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            (function(){
                function foo () {
                    return function () {
                        var sum = 1 + 2;
                        var sum = 3 + 4;
                        var sum = 5 + 6;
                        var sum = 8 - 6;
                    }
                }
            })();
        `,
        {
            ...NO_CUSTOM_NODES_PRESET,
            compact: false,
            controlFlowFlattening: true,
            disableConsoleOutput: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
