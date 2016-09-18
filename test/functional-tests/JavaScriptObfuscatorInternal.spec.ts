import { IObfuscationResult } from "../../src/interfaces/IObfuscationResult";

import { JavaScriptObfuscatorInternal } from "../../src/JavaScriptObfuscatorInternal";

import { NO_CUSTOM_NODES_PRESET } from "../../src/preset-options/NoCustomNodesPreset";

const assert: Chai.AssertStatic = require('chai').assert;

describe('JavaScriptObfuscatorInternal', () => {
    describe(`setSourceMapUrl (url: string)`, () => {
        let javaScriptObfuscator: JavaScriptObfuscatorInternal,
            obfuscationResult: IObfuscationResult,
            sourceMapUrl: string;

        it('should link obfuscated code with source map', () => {
            sourceMapUrl = 'test.map.js';
            javaScriptObfuscator = new JavaScriptObfuscatorInternal(
                `var test = 1;`,
                Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                    sourceMap: true
                })
            );

            javaScriptObfuscator.obfuscate();
            javaScriptObfuscator.setSourceMapUrl(sourceMapUrl);

            obfuscationResult = javaScriptObfuscator.getObfuscationResult();

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                new RegExp(`sourceMappingURL=${sourceMapUrl}`))
            ;
            assert.isOk(JSON.parse(obfuscationResult.getSourceMap()).mappings);
        });

        it('should properly add source map import to the obfuscated code if `sourceMapBaseUrl` is set', () => {
            sourceMapUrl = 'http://localhost:9000/';
            javaScriptObfuscator = new JavaScriptObfuscatorInternal(
                `var test = 1;`,
                Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                    sourceMap: true,
                    sourceMapBaseUrl: sourceMapUrl
                })
            );

            javaScriptObfuscator.obfuscate();

            obfuscationResult = javaScriptObfuscator.getObfuscationResult();

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                new RegExp(`sourceMappingURL=${sourceMapUrl}$`))
            ;
            assert.isOk(JSON.parse(obfuscationResult.getSourceMap()).mappings);
        });
    });
});
