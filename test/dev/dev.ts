'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function f(obj) {
                const {c} = obj;
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            renameGlobals: true,
            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
