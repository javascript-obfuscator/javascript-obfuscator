import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { readFileAsString } from '../../helpers/readFileAsString';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1112
//
describe('Issue #1112', () => {
    describe('Unicode mathematical bold identifiers should have correct spacing after keywords', () => {
        let testFunc: () => void;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1112.js');

            testFunc = () => {
                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    reservedNames: ['𝐜𝐨𝐧𝐭𝐞𝐱𝐭'],
                    compact: true,
                    seed: 1
                }).getObfuscatedCode();

                const result = eval(obfuscatedCode);

                if (result !== 42) {
                    throw new Error(
                        `Expected 42, got ${result}. ` +
                        `Missing space between keyword and Unicode identifier.`
                    );
                }
            };
        });

        it('should produce valid code with Unicode surrogate pair identifiers', () => {
            assert.doesNotThrow(testFunc);
        });
    });
});
