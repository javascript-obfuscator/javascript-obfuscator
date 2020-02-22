'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function foo (bar = {bar: 1}) {
            
            }
            
            function baz (bark = {bark: 1}) {
            
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            identifierNamesGenerator: 'mangled',
            transformObjectKeys: true,
            compact: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
