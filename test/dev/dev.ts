'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        function hi() {
          console.log("Hello World!");
        }
        hi();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            splitStrings: true,
            splitStringsChunkLength: 4,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
