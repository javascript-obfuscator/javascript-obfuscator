'use strict';
import { IdentifierNamesGenerator } from '../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            // Paste your JavaScript code here
            function hi() {
              console.log("Hello World!");
            }
            hi();
        `,
        {
            compact: false,
            selfDefending: false,
            disableConsoleOutput: false,
            debugProtection: false,
            debugProtectionInterval: false,
            splitStrings: true,
            splitStringsChunkLength: 5,
            splitStringsChunkLengthEnabled: true,
            stringArray: true,
            rotateStringArray: false,
            rotateStringArrayEnabled: true,
            stringArrayThreshold: 1,
            stringArrayThresholdEnabled: true,
            stringArrayEncoding: false,
            stringArrayEncodingEnabled: true,
            sourceMap: false,
            sourceMapBaseUrl: "",
            sourceMapFileName: "",
            sourceMapSeparate: false,
            domainLock: [],
            reservedNames: [],
            reservedStrings: [],
            seed: 0,
            controlFlowFlatteningThreshold: 1,
            controlFlowFlattening: true,
            deadCodeInjectionThreshold: 1,
            deadCodeInjection: true,
            unicodeEscapeSequence: false,
            renameGlobals: true,
            identifierNamesGenerator: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
            identifiersDictionary: ["foo", "bar", "baz", "bark", "hawk", "fooz", "moscow", "chikago"],
            identifiersPrefix: "",
            transformObjectKeys: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
