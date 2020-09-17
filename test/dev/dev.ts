'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { StringArrayWrappersType } from '../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';
import { StringArrayEncoding } from '../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const foo = 'aaa';

            function test (a, b) {
                const bar = 'bbb';
                const baz = 'ccc';
            
                function test1 (a, b) {
                    const bark = 'ddd';
                    const hawk = 'eee';
            
                    function test2 (a, b) {
                        const bark = 'ddd';
                        const hawk = 'eee';
            
                        return bark + hawk;
                    }
            
                    return bark + hawk;
                }
            
                return bar + baz + test1();
            }
            
            foo + test();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
            stringArray: true,
            stringArrayThreshold: 1,
            stringArrayEncoding: [
                StringArrayEncoding.None,
                StringArrayEncoding.Rc4
            ],
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersCount: 5,
            stringArrayWrappersType: StringArrayWrappersType.Function
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
