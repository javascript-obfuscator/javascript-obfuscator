'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            console.log("\\ud83d\\ude03\\ud83d\\ude03\\ud83d\\ude03");
            console.log("😃😃😃");
            console.log("abc efgx");
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            unicodeEscapeSequence: false,
            stringArray: false,
            stringArrayThreshold: 1,
            splitStrings: true,
            splitStringsChunkLength: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
