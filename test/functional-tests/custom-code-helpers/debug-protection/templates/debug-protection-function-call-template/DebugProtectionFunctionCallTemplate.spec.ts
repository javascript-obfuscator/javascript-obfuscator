import { assert } from 'chai';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { IdentifierNamesGenerator } from '../../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../../../../../../src/enums/ObfuscationTarget';

import { evaluateInWorker } from '../../../../../helpers/evaluateInWorker';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

describe('DebugProtectionFunctionCallTemplate', function () {
    const evaluationTimeout: number = 1500;

    this.timeout(10000);

    describe('Variant #1: correctly obfuscate code with `HexadecimalIdentifierNamesGenerator``', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        beforeEach(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    debugProtection: true,
                    identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
                }
            ).getObfuscatedCode();

            return evaluateInWorker(obfuscatedCode, evaluationTimeout)
                .then((result: string | null) => {
                    if (!result) {
                        return;
                    }

                    evaluationResult = parseInt(result, 10);
                });
        });

        it('should correctly evaluate code with enabled debug protection', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('Variant #2: correctly obfuscate code with `MangledIdentifierNamesGenerator` option', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        beforeEach(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    debugProtection: true,
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                }
            ).getObfuscatedCode();

            return evaluateInWorker(obfuscatedCode, evaluationTimeout)
                .then((result: string | null) => {
                    if (!result) {
                        return;
                    }

                    evaluationResult = parseInt(result, 10);
                });
        });

        it('should correctly evaluate code with enabled debug protection', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('Variant #3: correctly obfuscate code with `DictionaryIdentifierNamesGenerator` option', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        beforeEach(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    debugProtection: true,
                    identifierNamesGenerator: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
                    identifiersDictionary: ['foo', 'bar', 'baz', 'bark', 'hawk', 'eagle']
                }
            ).getObfuscatedCode();

            return evaluateInWorker(obfuscatedCode, evaluationTimeout)
                .then((result: string | null) => {
                    if (!result) {
                        return;
                    }

                    evaluationResult = parseInt(result, 10);
                });
        });

        it('should correctly evaluate code with enabled debug protection', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('Variant #4: correctly obfuscated code with target `BrowserNoEval`', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        beforeEach(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    debugProtection: true,
                    target: ObfuscationTarget.BrowserNoEval
                }
            ).getObfuscatedCode();

            return evaluateInWorker(obfuscatedCode, evaluationTimeout)
                .then((result: string | null) => {
                    if (!result) {
                        return;
                    }

                    evaluationResult = parseInt(result, 10);
                });
        });

        it('should correctly evaluate code with enabled debug protection', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('Variant #5: obfuscated code with removed debug protection code', () => {
        const expectedEvaluationResult: number = 0;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        beforeEach(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    debugProtection: true
                }
            ).getObfuscatedCode();
            obfuscatedCode = obfuscatedCode.replace(/\+\+ *_0x([a-f0-9]){4,6}/, '');

            return evaluateInWorker(obfuscatedCode, evaluationTimeout)
                .then((result: string | null) => {
                    if (!result) {
                        return;
                    }

                    evaluationResult = parseInt(result, 10);
                });
        });

        it('should enter code in infinity loop', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('Variant #6: single call of debug protection code', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        beforeEach(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/single-call.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    debugProtection: true
                }
            ).getObfuscatedCode();

            return evaluateInWorker(obfuscatedCode, evaluationTimeout)
                .then((result: string | null) => {
                    if (!result) {
                        return;
                    }

                    evaluationResult = parseInt(result, 10);
                });
        });

        it('should correctly evaluate code with enabled debug protection', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });
});
