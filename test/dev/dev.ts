'use strict';
import { NO_CUSTOM_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require("../../index");

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            (function(){
                if (true) {
                    var foo = function () {
                        console.log('abc');
                        console.log('cde');
                        console.log('efg');
                        console.log('hij');
                    };

                    foo();
                }
            })();
        `,
        {
            ...NO_CUSTOM_NODES_PRESET,
            compact: false,
            stringArray: true,
            stringArrayThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
