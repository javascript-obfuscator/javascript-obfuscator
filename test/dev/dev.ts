'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        var s = {
            'abcdefg': 'abcdefg'
        };
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            splitStrings: true,
            splitStringsChunkLength: 4,
            transformObjectKeys: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
