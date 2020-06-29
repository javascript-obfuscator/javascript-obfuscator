'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
           function foo () {
                if (true) {
                    console.log(3);
                    console.log(2);
            
                    return 'abc';
                }
            }
            
            console.log(foo());
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            minify: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
