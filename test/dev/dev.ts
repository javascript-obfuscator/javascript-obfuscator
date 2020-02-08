'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const sdasdas = '123';
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            identifierNamesGenerator: 'dictionary',
            identifiersDictionary: ['a', 'b', 'c', 'd', 'e'],
            stringArray: true,
            stringArrayThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
