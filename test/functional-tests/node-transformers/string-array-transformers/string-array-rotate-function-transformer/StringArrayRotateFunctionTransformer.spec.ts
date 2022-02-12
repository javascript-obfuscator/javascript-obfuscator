import { assert } from 'chai';
import * as sinon from 'sinon';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { evaluateInWorker } from '../../../../helpers/evaluateInWorker';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { StringArrayEncoding } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayIndexesType } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayIndexesType';
import { StringArrayWrappersType } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { NumberNumericalExpressionAnalyzer } from '../../../../../src/analyzers/number-numerical-expression-analyzer/NumberNumericalExpressionAnalyzer';
import { StringArrayRotateFunctionTransformer } from '../../../../../src/node-transformers/string-array-transformers/StringArrayRotateFunctionTransformer';

describe('StringArrayRotateFunctionTransformer', function () {
    this.timeout(120000);

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
                        stringArrayRotate: true,
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
                        stringArrayRotate: false,
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
                        stringArrayRotate: true,
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
                        stringArrayRotate: true,
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
                        stringArrayRotate: true,
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
            const samplesCount: number = 50;
            const evaluationTimeout: number = 5000;

            this.timeout(samplesCount * evaluationTimeout);

            let hasRuntimeErrors: boolean = false;

            before(async() => {
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
                            stringArrayRotate: true,
                            selfDefending: true,
                            splitStrings: true,
                            splitStringsChunkLength: 3,
                            stringArray: true,
                            stringArrayCallsTransform: true,
                            stringArrayCallsTransformThreshold: 1,
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
                        const evaluationResult = await evaluateInWorker(
                            obfuscateFunc(),
                            evaluationTimeout
                        );

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

        describe('Prevent early successful comparison', () => {
            const evaluationTimeout: number = 1000;
            const samplesCount: number = 100;

            let numberNumericalExpressionAnalyzerAnalyzeStub: sinon.SinonStub;
            let stringArrayRotateFunctionTransformerGetComparisonValueStub: sinon.SinonStub;

            let obfuscatedCode: string;
            let evaluationError: Error | null = null;

            before(async () => {
                stringArrayRotateFunctionTransformerGetComparisonValueStub = sinon
                    .stub(<any>StringArrayRotateFunctionTransformer.prototype, 'getComparisonValue')
                    .returns(5);
                numberNumericalExpressionAnalyzerAnalyzeStub = sinon
                    .stub(NumberNumericalExpressionAnalyzer.prototype, 'analyze')
                    .returns([[1, 2], 0, 3]);

                const code: string = readFileAsString(__dirname + '/fixtures/early-successful-comparison.js');

                for (let i = 0; i < samplesCount; i++) {
                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            seed: i,
                            stringArrayRotate: true,
                            stringArrayShuffle: true,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    try {
                        await evaluateInWorker(obfuscatedCode, evaluationTimeout);
                    } catch (error) {
                        evaluationError = error

                        break;
                    }
                }
            });

            it('should correctly evaluate code', () => {
                assert.equal(evaluationError, null);
            });

            after(() => {
                numberNumericalExpressionAnalyzerAnalyzeStub.restore();
                stringArrayRotateFunctionTransformerGetComparisonValueStub.restore();
            })
        });
    });
});
