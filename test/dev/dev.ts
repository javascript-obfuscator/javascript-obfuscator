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
                
                function test1 (a, b) {
                    const baz = 'ccc';
                    
                    function test2 (a, b) {
                        const bark = 'ddd';
                        
                        return bark;
                    }
                    
                    return baz + test2();
                }
                
                return bar + test1();
            }
            
            function test3 (a, b) {
                const hawk = 'eee';
                
                return hawk;
            }
            
            foo + test() + test3();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
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
