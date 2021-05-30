'use strict';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscationResult = JavaScriptObfuscator.obfuscate(
        `
            function foo() {
               global.baz = 3;
            }
            
            function bar(...args) {
                console.log(2);
            }
        `,
        {
            compact: false,
            identifierNamesCache: {
                globalIdentifiers: {},
                propertyIdentifiers: {}
            },
            renameGlobals: true,
            renameProperties: true
        }
    );

    let obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
    let identifierNamesCache = obfuscationResult.getIdentifierNamesCache();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
    console.log(identifierNamesCache);
})();
