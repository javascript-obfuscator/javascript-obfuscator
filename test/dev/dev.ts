'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function foo() {
                if (true) {
                    if (false) {
                        var bar = baz();
                    }
                } else {
                    var bark = hawk();
                }
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            minify: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
