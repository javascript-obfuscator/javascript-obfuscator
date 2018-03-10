'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        (function() {
            function test() {
                class inner {}
                let a, b, c, d;
            }
        })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            identifierNamesGenerator: 'mangled'
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
