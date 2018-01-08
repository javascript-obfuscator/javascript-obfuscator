'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        (function(){
            function foo (a, b) {
                return eval('var c = a + b; eval(\\'a + c\\');');

            }
            
            console.log(foo(1, 2));
        })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
