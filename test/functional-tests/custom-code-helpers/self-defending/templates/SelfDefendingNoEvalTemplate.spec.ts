import { assert } from 'chai';

import { ObfuscationTarget } from '../../../../../src/enums/ObfuscationTarget';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { evaluateInWorker } from '../../../../helpers/evaluateInWorker';
import { readFileAsString } from '../../../../helpers/readFileAsString';
import { beautifyCode } from '../../../../helpers/beautifyCode';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('SelfDefendingNoEvalTemplate', function () {
    const evaluationTimeout: number = 3500;

    this.timeout(10000);

    describe('Variant #1: correctly obfuscate code with `HexadecimalIdentifierNamesGenerator``', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    selfDefending: true,
                    identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
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

        it('should correctly evaluate code with enabled self defending', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('Variant #2: correctly obfuscate code with `MangledIdentifierNamesGenerator` option', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    selfDefending: true,
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
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

        it('should correctly evaluate code with enabled self defending', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('Variant #3: correctly obfuscate code with `DictionaryIdentifierNamesGenerator` option', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    selfDefending: true,
                    identifierNamesGenerator: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
                    identifiersDictionary: ['foo', 'bar', 'baz', 'bark', 'hawk', 'eagle'],
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

        it('should correctly evaluate code with enabled self defending', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('Variant #4: obfuscated code with beautified self defending code', () => {
        const expectedEvaluationResult: number = 0;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    selfDefending: true,
                    target: ObfuscationTarget.BrowserNoEval
                }
            ).getObfuscatedCode();
            obfuscatedCode = beautifyCode(obfuscatedCode);

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
});
