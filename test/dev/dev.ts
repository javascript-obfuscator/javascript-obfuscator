'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            class Test {
                constructor () {
                    let test = {}
                }
                
                static methodA = () => {
                    console.log('method_A');
                }
                
                methodB () {
                    console.log('method_B');
                    
                    Test.methodA();
                }
            }
            
            const instance = new Test();
            
            Test.methodA();
            instance.methodB();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            stringArray: true,
            stringArrayThreshold: 1,
            transformObjectKeys: true,
            renameProperties: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
