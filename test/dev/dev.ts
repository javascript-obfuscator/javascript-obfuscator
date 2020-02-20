'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            var s = function () {};
            class Foo {
                bar (baz, bark) {
                    return s;
                }
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            renameGlobals: true,
            identifierNamesGenerator: 'mangled'
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
