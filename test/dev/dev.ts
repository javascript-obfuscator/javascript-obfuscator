'use strict';

import { StringArrayWrappersType } from '../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function foo () {
                var bar = 'bar';
                
                function baz () {
                    var baz = 'baz';
                    
                    return baz;
                }
                
                return bar + baz();
            }
            
            console.log(foo());
        `,
        {
            identifierNamesGenerator: 'mangled',
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            simplify: false,
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
            transformObjectKeys: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
