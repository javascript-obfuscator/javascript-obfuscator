'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            #!/usr/bin/env node
        
            /**
             * @license
             */
            var foo = 'abc';
            //bar
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            stringArray: true,
            stringArrayThreshold: 1,
            compact: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
