'use strict';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscationResult = JavaScriptObfuscator.obfuscate(
        `
            function foo() {
               var baz = 1; 
            }
            
            function bar(...args) {
                var bark = 2;
            }
        `,
        {
            compact: false,
            identifierNamesCache: { foo: '_0x5de86d', bar: '_0x2a943b' },
            renameGlobals: true
        }
    );

    let obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
    let identifierNamesCache = obfuscationResult.getIdentifierNamesCache();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
    console.log(identifierNamesCache);
})();
