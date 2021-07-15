'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscationResult = JavaScriptObfuscator.obfuscate(
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
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            simplify: false,
            stringArray: true,
            stringArrayThreshold: 1,
            stringArrayChainedCalls: true,
            stringArrayWrappersCount: 2,
            stringArrayWrappersType: 'function',
            identifierNamesGenerator: 'mangled'
        }
    );

    let obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
    let identifierNamesCache = obfuscationResult.getIdentifierNamesCache();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
    console.log(identifierNamesCache);
})();
