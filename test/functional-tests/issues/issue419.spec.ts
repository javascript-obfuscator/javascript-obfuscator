import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { readFileAsString } from '../../helpers/readFileAsString';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/419
//
describe('Issue #419', () => {
    describe('Fixture code should not break', () => {
        const codeRegExp: RegExp = /for await/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue419.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    compact: true
                }
            ).getObfuscatedCode();
        });

        it('does not break on obfuscating', () => {
            assert.doesNotThrow(() => eval(obfuscatedCode));
        });

        it('should return correct `for-await-of` statement', () => {
            assert.match(obfuscatedCode, codeRegExp);
        });
    });
});
