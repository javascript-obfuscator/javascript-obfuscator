'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function foo(a, b, c, d) {
              console.log(a, b, c, d)
            }
            
            function bar(...args) {
              foo(...args, 5)
            }
            
            bar(...[1, 2, 3], 4)
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            identifierNamesGenerator: 'mangled'
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
