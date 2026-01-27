import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { readFileAsString } from '../../helpers/readFileAsString';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1127
//
describe('Issue #1127', () => {
    describe('`await` used as identifier should not crash', () => {
        let testFunc: () => string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1127.js');

            testFunc = () =>
                JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET
                }).getObfuscatedCode();
        });

        it('does not crash on obfuscating', () => {
            assert.doesNotThrow(testFunc);
        });
    });

    describe('top-level await should still work', () => {
        let testFunc: () => string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1127-top-level-await.js');

            testFunc = () =>
                JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET
                }).getObfuscatedCode();
        });

        it('does not crash on obfuscating', () => {
            assert.doesNotThrow(testFunc);
        });
    });
});
