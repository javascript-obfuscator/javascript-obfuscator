'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        (function () {
            let a = 0;
            
            var foo0 = function (param1, param2) {
                var bar0 = 1;
                var baz0 = 2;
                
                foo1();
                
                function c () {
                    var a = 3;
                }
            }
            
            var foo1 = function (param1, param2) {
                var bar1 = 4;
                var baz1 = '55555'
            }
        })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            stringArray: true,
            stringArrayThreshold: 1,
            transformObjectKeys: true,
            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
            seed: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
