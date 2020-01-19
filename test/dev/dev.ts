'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { ObfuscationTarget } from '../../src/enums/ObfuscationTarget';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function f(obj) {
                const {c} = obj;
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            sourceMap: true,
            target: ObfuscationTarget.Browser
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
