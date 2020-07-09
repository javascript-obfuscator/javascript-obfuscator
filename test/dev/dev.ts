'use strict';

import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function foo (arg1, arg2, arg3) {
                console.log(arg1, arg2, arg3);
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            identifierNamesGenerator: IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
