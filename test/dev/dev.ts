'use strict';

(function () {
    const JavaScriptObfuscator: any = require('../../index');
    const code: string = `
        class Foo {}
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