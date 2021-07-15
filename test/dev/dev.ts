'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscationResult = JavaScriptObfuscator.obfuscate(
        `
            const isTrue = something => !!(something?.bob || something?.sally);
            const throwsError = () => {
              throw new Error("Should not be here!");
            };
           
            const myFunction2 = () => {
              return isTrue() ? { my: "object", nested: { anotherParam: new throwsError() } } : "The only place we should be";
            };
           
            
            console.log(myFunction2());
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            simplify: false,
            transformObjectKeys: true,
            identifierNamesGenerator: 'mangled'
        }
    );

    let obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
    let identifierNamesCache = obfuscationResult.getIdentifierNamesCache();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
    console.log(identifierNamesCache);
})();
