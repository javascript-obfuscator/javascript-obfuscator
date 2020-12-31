import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { StringArrayEncoding } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayIndexesType } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayIndexesType';
import { StringArrayWrappersType } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayRotateFunctionTransformer', () => {
    describe('Code helper append', () => {
        const regExp: RegExp = /while *\(!!\[]\) *\{/;

        describe('`stringArray` option is set', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        rotateStringArray: true,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should correctly append code helper into the obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('`stringArray` option isn\'t set', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        rotateStringArray: false,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t append code helper into the obfuscated code', () => {
                assert.notMatch(obfuscatedCode, regExp);
            });
        });

        describe('`stringArrayThreshold` option is `0.00001`', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        rotateStringArray: true,
                        stringArray: true,
                        stringArrayThreshold: 0.00001
                    }
                ).getObfuscatedCode();
            });

            it('should correctly append code helper into the obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('`stringArrayThreshold` option is `0`', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        rotateStringArray: true,
                        stringArray: true,
                        stringArrayThreshold: 0
                    }
                ).getObfuscatedCode();
            });

            it('should correctly append code helper into the obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Input code has no string literals', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/no-string-literals.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        rotateStringArray: true,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t append code helper into the obfuscated code', () => {
                assert.notMatch(obfuscatedCode, regExp);
            });
        });

        describe('Code evaluation', function () {
            this.timeout(100000);

            const samplesCount: number = 100;

            let hasRuntimeErrors: boolean = false;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/code-evaluation.js');

                const obfuscateFunc = () => {
                    return JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 1,
                            deadCodeInjection: true,
                            deadCodeInjectionThreshold: 1,
                            debugProtection: true,
                            disableConsoleOutput: true,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator,
                            numbersToExpressions: true,
                            simplify: true,
                            renameProperties: true,
                            rotateStringArray: true,
                            selfDefending: true,
                            splitStrings: true,
                            splitStringsChunkLength: 3,
                            stringArray: true,
                            stringArrayEncoding: [
                                StringArrayEncoding.None,
                                StringArrayEncoding.Base64,
                                StringArrayEncoding.Rc4
                            ],
                            stringArrayIndexesType: [
                                StringArrayIndexesType.HexadecimalNumber,
                                StringArrayIndexesType.HexadecimalNumericString
                            ],
                            stringArrayIndexShift: true,
                            stringArrayWrappersChainedCalls: true,
                            stringArrayWrappersCount: 5,
                            stringArrayWrappersParametersMaxCount: 5,
                            stringArrayWrappersType: StringArrayWrappersType.Function,
                            stringArrayThreshold: 1,
                            transformObjectKeys: true,
                            unicodeEscapeSequence: true
                        }
                    ).getObfuscatedCode();
                };


                for (let i = 0; i < samplesCount; i++) {
                    try {
                        const evaluationResult = eval(obfuscateFunc());

                        if (evaluationResult !== 'fooooooo') {
                            hasRuntimeErrors = true;
                            break;
                        }
                    } catch {
                        hasRuntimeErrors = true;
                        break;
                    }
                }
            });

            it('It should correctly evaluate obfuscated code', () => {
                assert.equal(hasRuntimeErrors, false);
            });
        });
    });
});
