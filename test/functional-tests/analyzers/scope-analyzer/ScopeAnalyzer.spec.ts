import 'reflect-metadata';

import { assert } from 'chai';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('ScopeAnalyzer', () => {
    describe('analyze', () => {
        /**
         * https://github.com/javascript-obfuscator/javascript-obfuscator/issues/804
         */
        describe('Variant #1: should attach a valid missing ranges', function() {
            this.timeout(120000);

            const samplesCount: number = 1000;
            let error: string | null = null;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/attach-missing-ranges.js');

                for (let i = 0; i < samplesCount; i++) {
                    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            stringArray: false,
                            selfDefending: true,
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 0.1,
                            splitStrings: false,
                            seed: i
                        }
                    ).getObfuscatedCode();

                    try {
                        eval(obfuscatedCode);
                    } catch ({message}) {
                        error = message;
                        break;
                    }
                }
            });

            it('should attach missing ranges based on the parent node and rename identifiers without errors', () => {
                assert.equal(error, null);
            });
        });
    });
});
