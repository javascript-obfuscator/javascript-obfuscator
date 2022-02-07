'use strict';

import { StringArrayWrappersType } from '../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function foo () {
                function bar() {
                    var string1 = 'string1';
                    var string2 = 'string2';
                    var string3 = 'string3';
                    var string4 = 'string4';
                    var string5 = 'string5';
                    var string6 = 'string6';
                    
                    function bark () {
                        var string1 = 'string1';
                        var string2 = 'string2';
                        var string3 = 'string3';
                        var string4 = 'string4';
                        var string5 = 'string5';
                        var string6 = 'string6';
                    }
                }
                
                bar()
            }
            
            console.log(foo());
        `,
        {
            identifierNamesGenerator: 'mangled',
            compact: false,
            controlFlowFlattening: false,
            controlFlowFlatteningThreshold: 1,
            simplify: false,
            stringArrayRotate: false,
            stringArray: true,
            stringArrayIndexesType: [
                'hexadecimal-number',
                'hexadecimal-numeric-string'
            ],
            stringArrayThreshold: 1,
            stringArrayCallsTransform: true,
            stringArrayCallsTransformThreshold: 1,
            rotateStringArray: true,
            stringArrayWrappersType: StringArrayWrappersType.Function,
            transformObjectKeys: false,
            seed: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
