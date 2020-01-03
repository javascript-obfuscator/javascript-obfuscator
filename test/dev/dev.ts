'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            async function testFunc(params) {
                for await (let param of params) {
                  
                }
            }
            testFunc(['foo']);
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
