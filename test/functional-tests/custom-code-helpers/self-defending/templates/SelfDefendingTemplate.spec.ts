import { assert } from 'chai';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { evaluateInWorker } from '../../../../helpers/evaluateInWorker';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('SelfDefendingTemplate', function () {
    const evaluationTimeout: number = 3500;

    this.timeout(10000);

    describe('Variant #1: correctly obfuscate code with `HexadecimalIdentifierNamesGenerator``', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        before((done) => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    selfDefending: true,
                    identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
                }
            ).getObfuscatedCode();

            evaluateInWorker(
                obfuscatedCode,
                (response: number) => {
                    evaluationResult = response;
                    done();
                },
                () => {
                    done();
                },
                () => {
                    done();
                },
                evaluationTimeout
            );
        });

        it('should correctly evaluate code with enabled self defending', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('Variant #2: correctly obfuscate code with `MangledIdentifierNamesGenerator` option', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        before((done) => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    selfDefending: true,
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                }
            ).getObfuscatedCode();

            evaluateInWorker(
                obfuscatedCode,
                (response: number) => {
                    evaluationResult = response;
                    done();
                },
                () => {
                    done();
                },
                () => {
                    done();
                },
                evaluationTimeout
            );
        });

        it('should correctly evaluate code with enabled self defending', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('Variant #3: correctly obfuscate code with `DictionaryIdentifierNamesGenerator` option', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        before((done) => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    selfDefending: true,
                    identifierNamesGenerator: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
                    identifiersDictionary: ['foo', 'bar', 'baz', 'bark', 'hawk', 'eagle']
                }
            ).getObfuscatedCode();

            evaluateInWorker(
                obfuscatedCode,
                (response: number) => {
                    evaluationResult = response;
                    done();
                },
                () => {
                    done();
                },
                () => {
                    done();
                },
                evaluationTimeout
            );
        });

        it('should correctly evaluate code with enabled self defending', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('Variant #4: obfuscated code with beautified self defending code', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        before((done) => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    selfDefending: true
                }
            ).getObfuscatedCode();
            obfuscatedCode = obfuscatedCode
                .replace(/function\(\){/g, 'function () {')
                .replace(/=/g, ' = ')
                .replace(/,/g, ', ')
                .replace(/;/g, '; ');

            evaluateInWorker(
                obfuscatedCode,
                () => {
                    done();
                },
                () => {
                    done();
                },
                () => {
                    evaluationResult = 1;
                    done();
                },
                evaluationTimeout
            );
        });

        it('should enter code in infinity loop', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });
});
