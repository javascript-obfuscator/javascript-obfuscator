'use strict';

(function () {
    const JavaScriptObfuscator: any = require('../../index');
    const code: string = `
        class Foo {
            static {
                let abc = 2;
                abc = 3;
            }
        }
    `;

    let obfuscationResult = JavaScriptObfuscator.obfuscate(
        code,
        {
            compact: false
        }
    );

    let obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
    let identifierNamesCache = obfuscationResult.getIdentifierNamesCache();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
    console.log(identifierNamesCache);
})();