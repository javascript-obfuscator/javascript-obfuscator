'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function foo () {
                const {bar, baz} = {bar: 1, baz: 2};
                console.log(bar, baz);
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            simplify: true,
            renameGlobals: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
