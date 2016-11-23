import { IObfuscationResult } from '../../src/interfaces/IObfuscationResult';

import { JavaScriptObfuscatorInternal } from '../../src/JavaScriptObfuscatorInternal';

import { NO_CUSTOM_NODES_PRESET } from '../../src/preset-options/NoCustomNodesPreset';

import { Options } from '../../src/options/Options';

const assert: Chai.AssertStatic = require('chai').assert;

describe('JavaScriptObfuscatorInternal', () => {
    describe(`setSourceMapUrl (url: string)`, () => {
        let javaScriptObfuscator: JavaScriptObfuscatorInternal,
            obfuscationResult: IObfuscationResult,
            sourceMapUrl: string = 'test.js.map';

        it('should link obfuscated code with source map', () => {
            javaScriptObfuscator = new JavaScriptObfuscatorInternal(
                new Options(
                    Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                        sourceMap: true,
                        sourceMapFileName: sourceMapUrl
                    })
                )
            );

            obfuscationResult = javaScriptObfuscator.obfuscate('var test = 1;');

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                new RegExp(`sourceMappingURL=${sourceMapUrl}`))
            ;
            assert.isOk(JSON.parse(obfuscationResult.getSourceMap()).mappings);
        });

        it('should properly add base url to source map import inside obfuscated code if `sourceMapBaseUrl` is set', () => {
            let sourceMapBaseUrl: string = 'http://localhost:9000';

            javaScriptObfuscator = new JavaScriptObfuscatorInternal(
                new Options(
                    Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                        sourceMap: true,
                        sourceMapBaseUrl: sourceMapBaseUrl,
                        sourceMapFileName: sourceMapUrl
                    })
                )
            );

            obfuscationResult = javaScriptObfuscator.obfuscate('var test = 1;');

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                new RegExp(`sourceMappingURL=${sourceMapBaseUrl}/${sourceMapUrl}$`))
            ;
            assert.isOk(JSON.parse(obfuscationResult.getSourceMap()).mappings);
        });
    });
});
