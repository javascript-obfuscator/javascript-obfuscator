'use strict';
import { NO_CUSTOM_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

if (!(<any>global)._babelPolyfill) {
    require('babel-polyfill');
}

(function () {
    const JavaScriptObfuscator: any = require("../../index");

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            (function () {
                while (true) {
                    break;
                }
                console.log(1);
                console.log(2);
                console.log(3);
                console.log(4);
                console.log(5);
            })();
        `,
        {
            ...NO_CUSTOM_NODES_PRESET,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            compact: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
