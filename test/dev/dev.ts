'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function foo () {
                function bar () {
                    const a = [];
                    const b = [];
                    while (true) {
                        for (const a of b) {}
                    }
                    return a;
                }
            
                function baz () {
                    const a = 1;
                }
            
                function bark () {
                    const a = 1;
                    
                    if (true) {
                        console.log(a);
                    }
                }
            
                function hawk () {
                    const a = 1;
                }
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
