import { assert } from 'chai';
import { spawn } from 'threads';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

function spawnThread(inputCallback: Function, threadCallback: Function, timeoutCallback: Function): void {
    const thread = spawn<string, number>((input: string, postMessage: Function) => {
        postMessage(eval(input));
    });

    const timeout = setTimeout(() => {
        thread.kill();
        timeoutCallback();
    }, 1500);

    thread
        .send(inputCallback())
        .on('message', (response: number) => {
            clearTimeout(timeout);
            thread.kill();
            threadCallback(response);
        });
}

describe('DebugProtectionFunctionCallTemplate (): string', () => {
    describe('variant #1: correctly obfuscated code`', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        beforeEach((done) => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    debugProtection: true
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();

            spawnThread(
                () => obfuscatedCode,
                (response: number) => {
                    evaluationResult = response;
                    done();
                },
                () => {
                    done();
                }
            );
        });

        it('should correctly evaluate code with enabled debug protection', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('variant #2: correctly obfuscated code with enabled `mangle` option', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        beforeEach((done) => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    debugProtection: true,
                    mangle: true
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();

            spawnThread(
                () => obfuscatedCode,
                (response: number) => {
                    evaluationResult = response;
                    done();
                },
                () => {
                    done();
                }
            );
        });

        it('should correctly evaluate code with enabled debug protection', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('variant #3: obfuscated code with removed debug protection code', () => {
        const expectedEvaluationResult: number = 0;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        beforeEach((done) => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    debugProtection: true
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
            obfuscatedCode = obfuscatedCode.replace(/\+\+ *_0x([a-f0-9]){4,6}/, '++abc');

            spawnThread(
                () => obfuscatedCode,
                (response: number) => {
                    evaluationResult = response;
                    done();
                },
                () => {
                    done();
                }
            );
        });

        it('should enter code in infinity loop', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });

    describe('variant #4: single call of debug protection code', () => {
        const expectedEvaluationResult: number = 1;

        let obfuscatedCode: string,
            evaluationResult: number = 0;

        beforeEach((done) => {
            const code: string = readFileAsString(__dirname + '/fixtures/single-call.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    debugProtection: true
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();

            spawnThread(
                () => obfuscatedCode,
                (response: number) => {
                    evaluationResult = response;
                    done();
                },
                () => {
                    done();
                }
            );
        });

        it('should correctly evaluate code with enabled debug protection', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });
    });
});
