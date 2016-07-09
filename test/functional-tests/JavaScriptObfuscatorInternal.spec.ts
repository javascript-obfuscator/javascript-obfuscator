import { IObfuscationResult } from "../../src/interfaces/IObfuscationResult";

import { JavaScriptObfuscatorInternal } from "../../src/JavaScriptObfuscatorInternal";

import { NO_CUSTOM_NODES_PRESET } from "../../src/preset-options/NoCustomNodesPreset";

const assert: Chai.AssertStatic = require('chai').assert;

describe('JavaScriptObfuscatorInternal', () => {
    describe(`setSourceMapUrl (url: string)`, () => {
        let javaScriptObfuscator: JavaScriptObfuscatorInternal,
            obfuscationResult: IObfuscationResult,
            sourceMapUrl: string = 'test.map.js';

        beforeEach(() => {
            javaScriptObfuscator = new JavaScriptObfuscatorInternal(
                `var test = 1;`,
                Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                    sourceMap: true
                })
            );

            javaScriptObfuscator.obfuscate();
            javaScriptObfuscator.setSourceMapUrl(sourceMapUrl);

            obfuscationResult = javaScriptObfuscator.getObfuscationResult();
        });

        it('should link obfuscated code with source map', () => {
            assert.match(obfuscationResult.obfuscatedCode, new RegExp(`sourceMappingURL=${sourceMapUrl}`));
            assert.isOk(JSON.parse(obfuscationResult.sourceMap).mappings);
        });
    });
});
