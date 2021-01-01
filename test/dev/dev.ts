'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { StringArrayEncoding } from '../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            console.log('1');
            console.log('22');
            console.log('333');
            console.log('4444');
            console.log('55555');
            console.log('666666');
            console.log('7777777');
            console.log('88888888');
            console.log('999999999');
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            stringArray: true,
            stringArrayThreshold: 1,
            stringArrayEncoding: [
                StringArrayEncoding.Rc4
            ]
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
