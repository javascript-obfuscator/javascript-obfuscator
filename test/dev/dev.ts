'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function test() {                
                var obj;
                
                if (true) {
                    obj = 1;
                } else {
                    obj = 2;
                }
                
                console.log(obj);
            }
            
            console.log(test());
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
