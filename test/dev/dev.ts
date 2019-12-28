'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        var n = 'abcefgi';
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            splitStrings: true,
            splitStringsChunkLength: 4,
            stringArray: true,
            stringArrayThreshold: 1,
            seed: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
