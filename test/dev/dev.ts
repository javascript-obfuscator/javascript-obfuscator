'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            class Foo {
                [(1, Symbol.asyncIterator)]() {}
            }
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
