'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        function foo (foo) {}

        new foo();

        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            transformObjectKeys: true,
            seed: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
