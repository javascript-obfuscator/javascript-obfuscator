'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        (function(){
            function foo () {
                var a = 1;
                inner1();
                var b = 2;
                function inner1 () {}
                var c = 3;
            }
            function bar () {
                var a = 1;
            }
            function baz () {
                var a = 1;
            }
            function bark () {
                var a = 1;
            }
            function hawk () {
                var a = 1;
            }
            function eagle () {
                var a = 1;
            }
        })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
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
