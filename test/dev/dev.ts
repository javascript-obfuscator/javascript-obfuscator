'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        (function(){
            var object = {
                foo: 'test1',
                bar: {
                    baz: 'test2'
                }
            };
        })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            transformObjectKeys: true,
            stringArray: true,
            stringArrayThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
