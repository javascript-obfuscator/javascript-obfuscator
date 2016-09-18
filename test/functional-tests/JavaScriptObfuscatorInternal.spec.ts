import { IObfuscationResult } from "../../src/interfaces/IObfuscationResult";

import { JavaScriptObfuscatorInternal } from "../../src/JavaScriptObfuscatorInternal";

import { NO_CUSTOM_NODES_PRESET } from "../../src/preset-options/NoCustomNodesPreset";

const assert: Chai.AssertStatic = require('chai').assert;

describe('JavaScriptObfuscatorInternal', () => {
    describe(`setSourceMapUrl (url: string)`, () => {
        let javaScriptObfuscator: JavaScriptObfuscatorInternal,
            obfuscationResult: IObfuscationResult,
            sourceMapUrl: string = 'test.map.js';

        it('should link obfuscated code with source map', () => {
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

        it('should properly add base url to source map import inside obfuscated code if `sourceMapBaseUrl` is set', () => {
            let sourceMapBaseUrl: string = 'http://localhost:9000';

            javaScriptObfuscator = new JavaScriptObfuscatorInternal(
                `var test = 1;`,
                Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                    sourceMap: true,
                    sourceMapBaseUrl: sourceMapBaseUrl
                })
            );

            javaScriptObfuscator.obfuscate();
            javaScriptObfuscator.setSourceMapUrl(sourceMapUrl);

            obfuscationResult = javaScriptObfuscator.getObfuscationResult();

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                new RegExp(`sourceMappingURL=${sourceMapBaseUrl}/${sourceMapUrl}$`))
            ;
            assert.isOk(JSON.parse(obfuscationResult.getSourceMap()).mappings);
        });
    });
});
