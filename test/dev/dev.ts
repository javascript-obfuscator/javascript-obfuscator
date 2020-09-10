'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { StringArrayEncoding } from '../../src/enums/StringArrayEncoding';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function test () {
                const foo = 'foo';
                const bar = 'bar';
                const baz = 'baz';
            }
            
            console.log('ddd');
            console.log('eee');
            console.log('yyy');
            
            test();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            stringArray: true,
            stringArrayThreshold: 1,
            stringArrayIntermediateVariablesCount: 5,
            stringArrayEncoding: [
                StringArrayEncoding.None,
                StringArrayEncoding.Rc4
            ]
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
