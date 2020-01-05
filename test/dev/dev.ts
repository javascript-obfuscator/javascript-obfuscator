'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function foo () {
                function foo () {
                    return {
                        bar: {
                            foo: 1
                        }
                    };
                }
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            transformObjectKeys: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
