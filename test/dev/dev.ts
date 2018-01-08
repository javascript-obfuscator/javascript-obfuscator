'use strict';
import { NO_CUSTOM_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        (function(){
            function foo (bar) {
                eval('console.log(bar);');
            }
            
            foo(1);
        })();
        `,
        {
            ...NO_CUSTOM_NODES_PRESET,
            compact: false,
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
