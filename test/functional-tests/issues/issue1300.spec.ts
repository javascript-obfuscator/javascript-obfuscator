import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { readFileAsString } from '../../helpers/readFileAsString';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1300
//
describe('Issue #1300', () => {
    describe('Object inside loop should create new object each iteration', () => {
        const samplesCount = 50;

        it('does not break object creation semantics with transformObjectKeys', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1300.js');

            for (let i = 0; i < samplesCount; i++) {
                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    transformObjectKeys: true,
                    seed: i
                }).getObfuscatedCode();

                const originalResult = eval(code);
                const obfuscatedResult = eval(obfuscatedCode);

                assert.equal(originalResult, false, 'Original code should return false');
                assert.equal(obfuscatedResult, false, `Obfuscated code should return false (seed: ${i})`);
            }
        });

        it('does not break with for-in loop', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1300-for-in.js');

            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                transformObjectKeys: true
            }).getObfuscatedCode();

            assert.equal(eval(code), false);
            assert.equal(eval(obfuscatedCode), false);
        });

        it('does not break with for-of loop', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1300-for-of.js');

            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                transformObjectKeys: true
            }).getObfuscatedCode();

            assert.equal(eval(code), false);
            assert.equal(eval(obfuscatedCode), false);
        });

        it('does not break with while loop', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1300-while.js');

            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                transformObjectKeys: true
            }).getObfuscatedCode();

            assert.equal(eval(code), false);
            assert.equal(eval(obfuscatedCode), false);
        });

        it('does not break with do-while loop', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1300-do-while.js');

            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                transformObjectKeys: true
            }).getObfuscatedCode();

            assert.equal(eval(code), false);
            assert.equal(eval(obfuscatedCode), false);
        });
    });
});
