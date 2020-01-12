'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            var foo = 'foo';
            var bar = 'bar';
            var baz = 'baz';
            var bark = 'bark';
            
            console.log(foo, bar, baz, bark);
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            stringArray: true,
            stringArrayThreshold: 1,
            rotateStringArray: true,
            shuffleStringArray: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
