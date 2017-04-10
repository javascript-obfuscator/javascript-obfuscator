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
                var bar = function () {
                    alert('def');
                };
                var baz = function () {
                    alert('ghi');
                };
                var bark = function () {
                    alert('jkl');
                };
                var hawk = function () {
                    alert('mno');
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
