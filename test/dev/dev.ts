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
                };
                // javascript-obfuscator:disable
                var bar = function () {
                    console.log('def');
                };
                var baz = function () {
                    console.log('ghi');
                };
                var bark = function () {
                    console.log('jkl');
                };
                var hawk = function () {
                    console.log('mno');
                };
            
                foo();
                bar();
                baz();
                bark();
                hawk();
            }
        })();
        `,
        {
            ...NO_CUSTOM_NODES_PRESET,
            compact: false,
            stringArray: false,
            stringArrayThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
