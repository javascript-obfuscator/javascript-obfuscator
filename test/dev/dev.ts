'use strict';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function foo () {
                var bar = 'bar';
                
                return bar;
            }
            
            console.log(foo());
        `,
        {
            seed: 1,
            identifierNamesGenerator: 'mangled',
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            simplify: false,
            stringArray: true,
            stringArrayIndexesType: ['hexadecimal-numeric-string'],
            stringArrayThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
