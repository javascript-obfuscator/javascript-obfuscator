'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        (function () {
            let a = 0;
            
            function foo0 (param) {
                var bar0 = 1;
                var baz0 = 2;
                
                foo1();
                
                function c () {
                    var a = 3;
                }
            }
            
            function foo1 () {
                var bar1 = 4;
                var baz1 = 5;
            }
        })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            transformObjectKeys: true,
            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
