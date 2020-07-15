'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            var foo = function () {};
            var bar = function () {
                var baz = function () {};
                var bark = function () {
                    var hawk = 1;
                    var dog = 2;
                };
            };
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            simplify: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
