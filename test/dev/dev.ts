'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const foo = 'foo test';

            function test () {
                const bar = 'bar';
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
            stringArray: true,
            stringArrayThreshold: 1,
            unicodeEscapeSequence: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
