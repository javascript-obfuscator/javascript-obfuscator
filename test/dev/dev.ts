'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            (function () {
                var a, b;
                ({a, b} = {a: 1, b: 2});
            
                console.log(a, b);
            })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            transformObjectKeys: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
