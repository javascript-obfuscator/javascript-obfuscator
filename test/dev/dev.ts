'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const foo = 'aaa';

            function test (a, b) {
                const bar = 'bbb';
                
                return a + b;
            }
            
            function test1 (a, b) {
                const bar = 'bbb';
                
                return a + b;
            }
            
            test();
            
            var baz = 5;
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
            renameGlobals: true,
            stringArray: true,
            stringArrayThreshold: 1,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersCount: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
