import { assert } from 'chai';

import { IObfuscationResult } from '../../src/interfaces/IObfuscationResult';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscator';

import { NO_CUSTOM_NODES_PRESET } from '../../src/preset-options/NoCustomNodesPreset';
import { readFileAsString } from '../helpers/readFileAsString';

describe('JavaScriptObfuscator', () => {
    describe('obfuscate (sourceCode: string, customOptions?: IObfuscatorOptions): IObfuscationResult', () => {
        describe('if `sourceMap` option is `false`', () => {
            it('should returns object with obfuscated code and empty source map', () => {
                let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    `var test = 1;`,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                assert.isOk(obfuscationResult.getObfuscatedCode());
                assert.isNotOk(obfuscationResult.getSourceMap());
            });
        });

        describe('if `sourceMap` option is `true`', () => {
            it('should returns object with obfuscated code and source map', () => {
                let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    `var test = 1;`,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        sourceMap: true
                    }
                );

                assert.isOk(obfuscationResult.getObfuscatedCode());
                assert.isOk(JSON.parse(obfuscationResult.getSourceMap()).mappings);
            });

            it('should returns object with obfuscated code with inline source map as Base64 string', () => {
                let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    `var test = 1;`,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        sourceMap: true,
                        sourceMapMode: 'inline'
                    }
                );

                assert.isOk(obfuscationResult.getObfuscatedCode());
                assert.match(
                    obfuscationResult.getObfuscatedCode(),
                    /sourceMappingURL=data:application\/json;base64/
                );
                assert.isOk(obfuscationResult.getSourceMap());
            });

            it('should returns object with empty obfuscated code and source map with empty data if source code is empty', () => {
                let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    '',
                    {
                        sourceMap: true
                    }
                );

                assert.isNotOk(obfuscationResult.getObfuscatedCode());
                assert.deepEqual(JSON.parse(obfuscationResult.getSourceMap()).names, []);
                assert.deepEqual(JSON.parse(obfuscationResult.getSourceMap()).sources, []);
                assert.isNotOk(JSON.parse(obfuscationResult.getSourceMap()).mappings);
            });
        });

        it('should returns an empty string if source code is empty', () => {
            assert.isNotOk(
                JavaScriptObfuscator.obfuscate(
                    ''
                ).getObfuscatedCode()
            );
        });

        it('should returns an empty string if source code contains only comments', () => {
            assert.isNotOk(
                JavaScriptObfuscator.obfuscate(
                    '// comment'
                ).getObfuscatedCode()
            );
        });

        it('should obfuscate simple code with variable inside global scope', () => {
            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `var test = 1;`,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                ).getObfuscatedCode(),
                /^var *test *= *0x\d+;$/
            );
        });

        it('should obfuscate simple code with variable inside block-scope', () => {
            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `(function () {var test = 1;})()`,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                ).getObfuscatedCode(),
                /^\(function *\(\) *\{ *var *_0x[\w]+ *= *0x\d+; *\}(\(\)\)|\)\(\));?$/
            );
        });

        it('should obfuscate simple code with literal variable value', () => {
            let pattern1: RegExp = /^var _0x(\w){4} *= *\['(\\[x|u]\d+)+'\];/,
                pattern2: RegExp = /var *test *= *_0x(\w){4}\('0x0'\);$/,
                obfuscatedCode1: string = JavaScriptObfuscator.obfuscate(
                    `var test = 'abc';`,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode(),
                obfuscatedCode2: string = JavaScriptObfuscator.obfuscate(
                    `var test = 'абц';`,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();

            assert.match(obfuscatedCode1, pattern1);
            assert.match(obfuscatedCode1, pattern2);

            assert.match(obfuscatedCode2, pattern1);
            assert.match(obfuscatedCode2, pattern2);
        });

        it('should returns same code every time with same `seed`', () => {
            const code: string = readFileAsString('./test/fixtures/sample.js');
            const seed: number = 12345;

            const obfuscationResult1: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code, { seed: seed }
            );
            const obfuscationResult2: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code, { seed: seed }
            );

            assert.equal(obfuscationResult1.getObfuscatedCode(), obfuscationResult2.getObfuscatedCode());
        });

        it('should returns different code with different `seed` option value', () => {
            const code: string = readFileAsString('./test/fixtures/sample.js');

            const obfuscationResult1: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code, { seed: 12345 }
            );
            const obfuscationResult2: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code, { seed: 12346 }
            );

            const obfuscationResult3: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code, { seed: 0 }
            );
            const obfuscationResult4: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code, { seed: 0 }
            );

            assert.notEqual(obfuscationResult1.getObfuscatedCode(), obfuscationResult2.getObfuscatedCode());
            assert.notEqual(obfuscationResult3.getObfuscatedCode(), obfuscationResult4.getObfuscatedCode());
        });
    });
});
