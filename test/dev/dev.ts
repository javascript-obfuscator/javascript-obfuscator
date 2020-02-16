'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            (function () {
                function foo () {
                     const f = {f: 1};
                     const g = {g: 2};
                     const h = {h: 3};
                     const i = {i: 4};
                     const j = {j: 5};
                }
                
                function bar () {
                     const a = 11;
                     const b = 12;
                     const c = 13;
                     const d = 14;
                     const e = 15;
                }
            })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            identifierNamesGenerator: 'mangled',
            log: true,
            transformObjectKeys: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
