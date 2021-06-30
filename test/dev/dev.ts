'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscationResult = JavaScriptObfuscator.obfuscate(
        `
            console.log('foo');
            console.log('bar');
            console.log('bar');
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            debugProtection: true,
            debugProtectionInterval: true,
            disableConsoleOutput: false,
            rotateStringArray: true,
            selfDefending: true,
            stringArray: true,
            stringArrayThreshold: 1,
            transformObjectKeys: true,
            unicodeEscapeSequence: false
        }
    );

    let obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
    let identifierNamesCache = obfuscationResult.getIdentifierNamesCache();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
    console.log(identifierNamesCache);
})();
