'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            var a, b;
            ({a, ...b} = {a: 1, b: 2, c: 3});
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            renameGlobals: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
