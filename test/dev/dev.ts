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
                var abc = 1 + 1;
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
