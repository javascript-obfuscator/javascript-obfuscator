'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            var abc = 1;
            var cde = 1;
            var fg = 1;
            var sss = 1;
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            renameGlobals: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
