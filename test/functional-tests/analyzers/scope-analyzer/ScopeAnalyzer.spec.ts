import 'reflect-metadata';

import { assert } from 'chai';

import { evalLocal } from '../../../helpers/evalLocal';
import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('ScopeAnalyzer', () => {
    describe('analyze', () => {
        /**
         * https://github.com/javascript-obfuscator/javascript-obfuscator/issues/804
         */
        describe('Variant #1: should attach a valid missing ranges', function () {
            this.timeout(120000);

            const samplesCount: number = 1000;
            let error: string | null = null;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/attach-missing-ranges.js');

                for (let i = 0; i < samplesCount; i++) {
                    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                        stringArray: false,
                        selfDefending: true,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 0.1,
                        splitStrings: false,
                        seed: i
                    }).getObfuscatedCode();

                    try {
                        eval(obfuscatedCode);
                    } catch ({ message }) {
                        error = message;
                        break;
                    }
                }
            });

            it('should attach missing ranges based on the parent node and rename identifiers without errors', () => {
                assert.equal(error, null);
            });
        });

        describe('Variant #2: Annex B function hoisting', () => {
            describe('Variant #1: basic block-scoped function hoisting', () => {
                const samplesCount: number = 50;

                let testFunc: () => void;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/annex-b-function-hoisting.js');

                    testFunc = () => {
                        for (let i = 0; i < samplesCount; i++) {
                            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                                seed: i
                            }).getObfuscatedCode();

                            const result = evalLocal(obfuscatedCode);

                            if (result.test1 !== 'foo') {
                                throw new Error('test1 failed: expected foo, got ' + result.test1);
                            }

                            if (result.test2 !== 'bar') {
                                throw new Error('test2 failed: expected bar, got ' + result.test2);
                            }
                        }
                    };
                });

                it('should correctly handle Annex B function hoisting references', () => {
                    assert.doesNotThrow(testFunc);
                });
            });

            describe('Variant #2: strict mode should not apply Annex B hoisting', () => {
                let testFunc: () => void;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/annex-b-strict-mode.js');

                    testFunc = () => {
                        const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                            seed: 12345
                        }).getObfuscatedCode();

                        eval(obfuscatedCode);
                    };
                });

                it('should correctly handle strict mode block-scoped functions', () => {
                    assert.doesNotThrow(testFunc);
                });
            });

            describe('Variant #3: let/const shadowing should prevent Annex B hoisting', () => {
                let testFunc: () => void;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/annex-b-let-const-shadowing.js');

                    testFunc = () => {
                        const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                            seed: 12345
                        }).getObfuscatedCode();

                        const result = eval(obfuscatedCode);
                        if (result !== 'outer') {
                            throw new Error('Expected outer, got: ' + result);
                        }
                    };
                });

                it('should not hoist when let/const shadows the function name', () => {
                    assert.doesNotThrow(testFunc);
                });
            });
        });
    });
});
