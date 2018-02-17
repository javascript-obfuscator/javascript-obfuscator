'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        (function(){
            function foo () {
                function inner1 () {}
                inner1();
            }
            function bar () {
                function inner2 () {}
                inner2();
            }
            function baz () {
                function inner3 () {}
                inner3();
            }
            function bark () {
                function inner4 () {}
                inner4();
            }
            function hawk () {
                function inner5 () {}
                inner5();
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
