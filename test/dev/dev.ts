'use strict';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscationResult = JavaScriptObfuscator.obfuscate(
        `
            (function(){
                if (true) {
                    var foo = function () {
                        console.log('abc');
                    };
                    var bar = function () {
                        console.log('def');
                    };
                    var baz = function () {
                        console.log('ghi');
                    };
                    var bark = function () {
                        console.log('jkl');
                    };
                    var hawk = function () {
                        console.log('mno');
                    };
            
                    foo();
                    bar();
                    baz();
                    bark();
                    hawk();
                }
            })();
        `,
        {
            compact: false,
            simplify: false,
            stringArray: true,
            stringArrayThreshold: 1,
            stringArrayWrappersChainedCalls: true,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            identifierNamesGenerator: 'mangled',
            seed: 1
        }
    );

    let obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
    let identifierNamesCache = obfuscationResult.getIdentifierNamesCache();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
    console.log(identifierNamesCache);
})();
