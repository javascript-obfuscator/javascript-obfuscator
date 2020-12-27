'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { StringArrayEncoding } from '../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayIndexesType } from '../../src/enums/node-transformers/string-array-transformers/StringArrayIndexesType';
import { StringArrayWrappersType } from '../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            (function(){
                var variable1 = '5' - 3;
                var variable2 = '5' + 3;
                var variable3 = '5' + - '2';
                var variable4 = ['10','10','10','10','10'].map(parseInt);
                var variable5 = 'foo ' + 1 + 1;
                console.log(variable1);
                console.log(variable2);
                console.log(variable3);
                console.log(variable4);
                console.log(variable5);
            })();
            
            (function(){
                if (true) {
                    var foo = function () {
                        console.log('abc');
                        console.log('cde');
                        console.log('efg');
                        console.log('hij');
                    };
                    
                    var bar = function () {
                        console.log('klm');
                        console.log('nop');
                        console.log('qrs');
                    };
                
                    var baz = function () {
                        console.log('tuv');
                        console.log('wxy');
                        console.log('z');
                    };
                
                    foo();
                    bar();
                    baz();
                }
            })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            renameProperties: true,
            rotateStringArray: true,
            splitStrings: true,
            splitStringsChunkLength: 3,
            stringArray: true,
            stringArrayEncoding: [
                StringArrayEncoding.None,
                StringArrayEncoding.Base64,
                StringArrayEncoding.Rc4
            ],
            stringArrayIndexesType: [
                StringArrayIndexesType.HexadecimalNumber,
                StringArrayIndexesType.HexadecimalNumericString
            ],
            stringArrayIndexShift: true,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersCount: 5,
            stringArrayWrappersParametersMaxCount: 5,
            stringArrayWrappersType: StringArrayWrappersType.Function,
            stringArrayThreshold: 1,
            transformObjectKeys: true,
            unicodeEscapeSequence: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
