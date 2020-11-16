'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { StringArrayIndexesType } from '../../src/enums/node-transformers/string-array-transformers/StringArrayIndexesType';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            // Paste your JavaScript code here
            function hi() {
              function inner () {
                  console.log('inner');
                  console.log('inner1');
              }
              
              console.log("Hello World!");
              
              inner();
            }
            hi();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            rotateStringArray: true,
            shuffleStringArray: true,
            stringArray: true,
            /*stringArrayEncoding: [
                StringArrayEncoding.None,
                StringArrayEncoding.Rc4
            ],*/
            stringArrayIndexesType: [
                StringArrayIndexesType.HexadecimalNumericString,
                StringArrayIndexesType.HexadecimalNumber
            ],
            stringArrayIndexShift: true,
            stringArrayThreshold: 1,
            stringArrayWrappersCount: 1,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 2,
            stringArrayWrappersType: 'function'
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
