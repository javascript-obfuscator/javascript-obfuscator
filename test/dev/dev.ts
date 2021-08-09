'use strict';

import { StringArrayWrappersType } from '../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';
import { StringArrayEncoding } from '../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';

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
                    console.log('method_C');
                    console.log('method_D');
                    console.log('method_E');
                    
                    Test.methodA();
                }
            }
            
            const instance = new Test();
            
            Test.methodA();
            instance.methodB();
        `,
        {
            identifierNamesGenerator: 'mangled',
            compact: false,
            simplify: false,
            stringArray: true,
            stringArrayThreshold: 1,
            stringArrayCallsTransform: true,
            stringArrayCallsTransformThreshold: 1,
            stringArrayWrappersCount: 2,
            stringArrayWrappersParametersMaxCount: 5,
            stringArrayWrappersType: StringArrayWrappersType.Function,
            stringArrayEncoding: [StringArrayEncoding.Rc4]
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
