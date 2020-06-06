'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            var x = {
                baz_: 0,
                foo_: 1,
                calc: function() {
                    return this.foo_ + this.baz_;
                }
            };
            x.bar_ = 2;
            x["baz_"] = 3;
            console.log(x.calc());
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            log: true,
            identifierNamesGenerator: 'mangled',
            renameGlobals: true,
            splitStrings: true,
            splitStringsChunkLength: 3,
            stringArray: true,
            stringArrayThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
