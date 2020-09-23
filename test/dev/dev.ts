'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { StringArrayWrappersType } from '../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const foo = 'foo';

            function test () {
                const bar = 'bar';
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            forceTransformedStrings: ['foo'],
            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
            stringArray: true,
            stringArrayThreshold: 0,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersCount: 1,
            stringArrayWrappersType: StringArrayWrappersType.Function
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
