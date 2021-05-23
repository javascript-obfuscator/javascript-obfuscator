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
                
                methodA = () => {
                    console.log('methodA');
                }
                
                methodB () {
                    console.log('methodB');
                    
                    this.methodA();
                }
            }
            
            const instance = new Test();
            
            instance.methodA();
            instance.methodB();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            stringArray: true,
            stringArrayThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
