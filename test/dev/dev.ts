'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const epsilon = 500;
            const number = 500000.0000001;
             
            if(epsilon > 0 && number > 500000.0000000 && number < 500000.0000002) {
                console.log("math works!");
            };

        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            numbersToExpressions: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
