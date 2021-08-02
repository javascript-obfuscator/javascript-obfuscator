'use strict';

import { readFileAsString } from '../helpers/readFileAsString';

(function () {
    const JavaScriptObfuscator: any = require('../../index');
    const code: string = readFileAsString(__dirname + '/../functional-tests/javascript-obfuscator/fixtures/custom-nodes-identifier-names-collision.js');

    let obfuscationResult = JavaScriptObfuscator.obfuscate(
        code,
        {
            identifierNamesGenerator: 'mangled',
            compact: false,
            stringArray: true,
            seed: 429105580
        }
    );

    let obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
    let identifierNamesCache = obfuscationResult.getIdentifierNamesCache();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
    console.log(identifierNamesCache);
})();