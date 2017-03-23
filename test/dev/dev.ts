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
                        console.log('klm');
                        console.log('nop');
                        console.log('qrs');
                        console.log('tuv');
                        console.log('wxy');
                        console.log('w');
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
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
