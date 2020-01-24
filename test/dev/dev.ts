'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            var passthrough = (object) => object;
            var foo = {foo: 1},\t
                bar = passthrough({bar: foo.foo});
            console.log(bar.bar);
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            transformObjectKeys: true,
            compact: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
