'use strict';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            async function xyzzy(a,b)
            {
                if (a) {
                    return await foo(a) ;
                    console.log(a) ;
                } else {
                    return await bar(b) ;
                    console.log(b) ;
                }
            }
        `,
        {
            identifierNamesGenerator: 'mangled',
            compact: false,
            simplify: true,
            stringArray: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
