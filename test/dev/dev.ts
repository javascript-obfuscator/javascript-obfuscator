'use strict';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            var obj = {
                foo: 1
            }
        `,
        {
            "compact": false,
            "controlFlowFlattening": true,
            "controlFlowFlatteningThreshold": 1,
            "disableConsoleOutput": false,
            "identifierNamesGenerator": "mangled",
            "log": true,
            "numbersToExpressions": true,
            "renameProperties": true,
            "renamePropertiesMode": "safe",
            "simplify": false,
            "stringArray": true,
            "stringArrayCallsTransform": true,
            "stringArrayIndexShift": true,
            "stringArrayRotate": false,
            "stringArrayShuffle": false,
            "stringArrayWrappersCount": 5,
            "stringArrayWrappersChainedCalls": true,
            "stringArrayWrappersParametersMaxCount": 5,
            "stringArrayWrappersType": "function",
            "stringArrayThreshold": 0,
            "transformObjectKeys": true,
            "unicodeEscapeSequence": false,
            "ignoreRequireImports": false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
