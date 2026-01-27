import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { readFileAsString } from '../../helpers/readFileAsString';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1372
//
describe('Issue #1372', () => {
    describe('Spread operator with conditional object should work correctly', () => {
        const samplesCount = 50;

        let obfuscatedCode: string;

        it('does not break on run with controlFlowFlattening enabled', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1372.js');

            for (let i = 0; i < samplesCount; i++) {
                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1,
                    stringArray: true,
                    stringArrayThreshold: 1
                }).getObfuscatedCode();

                const result = eval(`
                    ${obfuscatedCode}
                    module.exports;
                `);

                const resultTrue = result.test(true);
                assert.deepEqual(resultTrue, { bgcolor: 'test', color: 'ok' });

                const resultFalse = result.test(false);
                assert.deepEqual(resultFalse, { bgcolor: 'test' });
            }
        });

        it('does not break on run with transformObjectKeys enabled', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1372.js');

            for (let i = 0; i < samplesCount; i++) {
                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    transformObjectKeys: true,
                    stringArray: true,
                    stringArrayThreshold: 1
                }).getObfuscatedCode();

                const result = eval(`
                    ${obfuscatedCode}
                    module.exports;
                `);

                const resultTrue = result.test(true);
                assert.deepEqual(resultTrue, { bgcolor: 'test', color: 'ok' });

                const resultFalse = result.test(false);
                assert.deepEqual(resultFalse, { bgcolor: 'test' });
            }
        });

        it('does not break on run with both controlFlowFlattening and transformObjectKeys enabled', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1372.js');

            for (let i = 0; i < samplesCount; i++) {
                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1,
                    transformObjectKeys: true,
                    stringArray: true,
                    stringArrayThreshold: 1
                }).getObfuscatedCode();

                const result = eval(`
                    ${obfuscatedCode}
                    module.exports;
                `);

                const resultTrue = result.test(true);
                assert.deepEqual(resultTrue, { bgcolor: 'test', color: 'ok' });

                const resultFalse = result.test(false);
                assert.deepEqual(resultFalse, { bgcolor: 'test' });
            }
        });
    });
});
