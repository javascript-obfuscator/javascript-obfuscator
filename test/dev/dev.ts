'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            (function () {
                const foo = {
                    prop1: 1,
                    prop2: 2,
                    calc: function () {
                        return this.prop1 + this.prop2;
                    }
                };
                
                console.log(foo.calc());
            })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            renameProperties: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
