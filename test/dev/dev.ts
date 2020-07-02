'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const foo = 'abc';
            console.log(foo);
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            stringArray: true,
            stringArrayThreshold: 1,
            stringArrayEncoding: 'base64',
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
