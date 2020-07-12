'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const foo = 0..toString();
            const bar = 'abc';
            
            console.log(foo, bar);
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            numbersToExpressions: true,
            stringArray: true,
            stringArrayThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
