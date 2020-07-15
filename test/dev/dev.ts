'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function foo () {
                console.log(1);
                
                const bar = 123;
                console.log(2);
                console.log(3);
                
                return bar;
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            simplify: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
