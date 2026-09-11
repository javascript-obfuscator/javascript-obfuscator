'use strict';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        (()=> {
            var obj = {
                foo: 1
            };
            console.log(obj['foo'], global.Math.random());
            if(Math.random() < Date.now()){
            for(let i=0; i<obj.foo; i++){
                console.log(["Aeneas was a robust guy,",
"A kozak full of vim,",
"Full of the devil, lewd and spry,",
"There was no one like him.",
"And when the Greeks had burned down Troy",
"And made of it, to their great joy,",
"A heap of dung, he left that waste",
"Together with some Trojan tramps,",
"The sun-tanned scamps.",
"They all took to their heels in haste."].join("\\n"));
            }
            }
            })();
            
        `,
        {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            disableConsoleOutput: false,
            identifierNamesGenerator: 'mangled',
            log: true,
            numbersToExpressions: false,
            renameProperties: true,
            renamePropertiesMode: 'safe',
            simplify: false,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayIndexShift: true,
            stringArrayRotate: false,
            stringArrayShuffle: false,
            stringArrayWrappersCount: 5,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 5,
            stringArrayWrappersType: 'function',
            stringArrayThreshold: 1,
            stringArrayEncoding: ['rc4'],
            transformObjectKeys: true,
            unicodeEscapeSequence: false,
            ignoreImports: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
