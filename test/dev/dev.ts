'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function func () {
                var obj = {foo: 'bar'};
                
                console.log(obj.foo);
            }
            
            func();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            transformObjectKeys: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
