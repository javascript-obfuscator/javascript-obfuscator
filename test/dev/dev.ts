'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscationResult = JavaScriptObfuscator.obfuscate(
        `
             function foo () {
                console.log('foo', 1);             
                console.log('foo', 2);             
                console.log('foo', 3);
                
                function bar() {
                    console.log('bar', 1);
                    console.log('bar', 2);
                    console.log('bar', 3);
                    
                    function baz() {
                        console.log('baz', 1);
                        console.log('baz', 2);
                        console.log('baz', 3);
                    }
                    
                    baz();
                }             
                
                bar();
             }
             
             foo();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            seed: 1,
            compact: false,
            simplify: false,
            stringArray: true,
            stringArrayThreshold: 1,
            stringArrayIndexShift: true,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersCount: 3,
            stringArrayWrappersType: 'function',
            stringArrayWrappersParametersMaxCount: 5,
            identifierNamesGenerator: 'mangled'
        }
    );

    let obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
    let identifierNamesCache = obfuscationResult.getIdentifierNamesCache();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
    console.log(identifierNamesCache);
})();
