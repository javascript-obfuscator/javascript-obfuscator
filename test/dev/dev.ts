'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const foo = 'foo'
            const bar = 'bar';
            const baz = 'baz';
            
            function test (arg = 'bark') {
                const hawk = 'hawk';
                const eagle = 'eagle';
                
                console.log(arg, hawk, eagle);
            }
            
            test();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
            renameGlobals: true,
            stringArray: true,
            transformObjectKeys: true,
            stringArrayThreshold: 1,
            stringArrayWrappersChainedCalls: false,
            stringArrayWrappersCount: 2
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
