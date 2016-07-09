import { IObfuscationResult } from "../../src/interfaces/IObfuscationResult";

import { JavaScriptObfuscator } from "../../src/JavaScriptObfuscator";

import { NO_CUSTOM_NODES_PRESET } from "../../src/preset-options/NoCustomNodesPreset";

const assert: Chai.AssertStatic = require('chai').assert;

describe('JavaScriptObfuscator', () => {
    describe('obfuscate (sourceCode: string, customOptions?: IOptionsPreset): string', () => {
        it('should returns empty string if source code is empty', () => {
            assert.isNotOk(JavaScriptObfuscator.obfuscate('', Object.assign({}, NO_CUSTOM_NODES_PRESET)));
        });

        it('should obfuscate simple code with variable inside global scope', () => {
            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `var test = 1;`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET)
                ),
                /^var *test *= *0x\d+;$/
            );
        });

        it('should obfuscate simple code with variable inside block-scope', () => {
            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `(function () {var test = 1;})()`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET)
                ),
                /^\(function *\(\) *\{ *var *_0x[\w]+ *= *0x\d+; *\}(\(\)\)|\)\(\));?$/
            );
        });

        it('should obfuscate simple code with literal variable value', () => {
            let pattern: RegExp = /^var _0x(\w){4} *= *\['(\\[x|u]\d+)+'\]; *var *test *= *_0x(\w){4}\[0x0\];$/;

            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `var test = 'abc';`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                        unicodeArray: true,
                        unicodeArrayThreshold: 1
                    })
                ),
                pattern
            );

            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `var test = 'абц';`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                        unicodeArray: true,
                        unicodeArrayThreshold: 1
                    })
                ),
                pattern
            );
        });
    });

    describe('obfuscateWithSourceMap (sourceCode: string, customOptions?: IOptionsPreset): string', () => {
        describe('if `sourceMap` option is `false`', () => {
            it('should returns object with obfuscated code and empty source map', () => {
                let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscateWithSourceMap(
                    `var test = 1;`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET)
                );

                assert.isOk(obfuscationResult.obfuscatedCode);
                assert.isNotOk(obfuscationResult.sourceMap);
            });
        });

        describe('if `sourceMap` option is `true`', () => {
            it('should returns object with obfuscated code and source map', () => {
                let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscateWithSourceMap(
                    `var test = 1;`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                        sourceMap: true
                    })
                );

                assert.isOk(obfuscationResult.obfuscatedCode);
                assert.isOk(JSON.parse(obfuscationResult.sourceMap).mappings);
            });

            it('should returns object with obfuscated code with inline source map and empty `sourceMap` if `sourceMapMode` is `inline', () => {
                let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscateWithSourceMap(
                    `var test = 1;`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                        sourceMap: true,
                        sourceMapMode: 'inline'
                    })
                );

                assert.isOk(obfuscationResult.obfuscatedCode);
                assert.match(
                    obfuscationResult.obfuscatedCode,
                    /sourceMappingURL=data:application\/json;base64/
                );
                assert.isNotOk(obfuscationResult.sourceMap);
            });

            it('should returns object with empty obfuscated code and source map with empty data if source code is empty', () => {
                let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscateWithSourceMap(
                    '',
                    Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                        sourceMap: true
                    })
                );

                assert.isNotOk(obfuscationResult.obfuscatedCode);
                assert.deepEqual(JSON.parse(obfuscationResult.sourceMap).names, []);
                assert.deepEqual(JSON.parse(obfuscationResult.sourceMap).sources, []);
                assert.isNotOk(JSON.parse(obfuscationResult.sourceMap).mappings);
            });
        });

        it('should returns empty string if source code is empty', () => {
            assert.isNotOk(
                JavaScriptObfuscator.obfuscateWithSourceMap(
                    '',
                    Object.assign({}, NO_CUSTOM_NODES_PRESET)
                ).obfuscatedCode
            );
        });

        it('should obfuscate simple code with variable inside global scope', () => {
            assert.match(
                JavaScriptObfuscator.obfuscateWithSourceMap(
                    `var test = 1;`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET)
                ).obfuscatedCode,
                /^var *test *= *0x\d+;$/
            );
        });

        it('should obfuscate simple code with variable inside block-scope', () => {
            assert.match(
                JavaScriptObfuscator.obfuscateWithSourceMap(
                    `(function () {var test = 1;})()`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET)
                ).obfuscatedCode,
                /^\(function *\(\) *\{ *var *_0x[\w]+ *= *0x\d+; *\}(\(\)\)|\)\(\));?$/
            );
        });

        it('should obfuscate simple code with literal variable value', () => {
            let pattern: RegExp = /^var _0x(\w){4} *= *\['(\\[x|u]\d+)+'\]; *var *test *= *_0x(\w){4}\[0x0\];$/;

            assert.match(
                JavaScriptObfuscator.obfuscateWithSourceMap(
                    `var test = 'abc';`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                        unicodeArray: true,
                        unicodeArrayThreshold: 1
                    })
                ).obfuscatedCode,
                pattern
            );

            assert.match(
                JavaScriptObfuscator.obfuscateWithSourceMap(
                    `var test = 'абц';`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                        unicodeArray: true,
                        unicodeArrayThreshold: 1
                    })
                ).obfuscatedCode,
                pattern
            );
        });
    });
});
