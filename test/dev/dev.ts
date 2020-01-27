'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            class A {
                foo() {
                    return A;
                }
                
                bar() {
                    var A = 1;
                    return A;
                }
            }
            
            console.log(A);
            
            function foo () {
                class B {
                    foo() {
                        return B;
                    }
                }
                
                console.log(B);
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
