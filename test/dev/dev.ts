'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { StringArrayEncoding } from '../../src/enums/StringArrayEncoding';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const foo = 'foo';
            const bar = 'bar';
            const baz = 'baz';
            
            console.log(foo, bar, baz);
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            stringArray: true,
            stringArrayThreshold: 1,
            stringArrayIntermediateVariablesCount: 2,
            stringArrayEncoding: [
                StringArrayEncoding.Rc4
            ]
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
