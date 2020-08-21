'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function azaza() {
                var pre = 1;
                
                var tag = function (strings, ...args) {
                    return [strings.raw, args]
                }
                
                var tag1 = function (strings, ...args) {
                    return [strings.raw]
                }
                
                var foo = 1;
                
                console.log(tag\`\${'first'}m\\iddle\${'second'}end\`);
                console.log(tag1\`\${'first'}middle\${'second'}end\`);
                
                var bar = 2;
            }
            
            azaza();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            stringArray: true,
            stringArrayThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
