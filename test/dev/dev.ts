'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            (function () {
                const log = console.log;
                const first = 'foo';
                const rest = ['bar', 'baz', 'bark'];
                log(first, ...rest);            
            })();

        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
