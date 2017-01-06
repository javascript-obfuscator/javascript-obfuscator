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
                function foo () {
                    return function () {
                        var sum = 1 + 2;
                        console.log(1);
                        console.log(2);
                        console.log(3);
                        console.log(4);
                        console.log(5);
                        console.log(6);
                    }
                }
            })();
        `,
        {
            ...NO_CUSTOM_NODES_PRESET,
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            disableConsoleOutput: false,
            unicodeEscapeSequence: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
