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
                function t () {
                    return function () {
                        var t = 1 * 2;
                    }
                }
                
                var s = 1 - 3;
            })();
        `,
        {
            ...NO_CUSTOM_NODES_PRESET,
            controlFlowFlattening: true,
            disableConsoleOutput: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
