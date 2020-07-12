'use strict';

import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const example1 = 0;
            const example2 = 1;
            const example3 = 100;
            const example4 = 125793;
            const example5 = -15232103;
            
            console.log(example1);
            console.log(example2);
            console.log(example3);
            console.log(example4);
            console.log(example5);
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            identifierNamesGenerator: IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
