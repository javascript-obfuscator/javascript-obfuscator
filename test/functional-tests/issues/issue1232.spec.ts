import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { readFileAsString } from '../../helpers/readFileAsString';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1232
//
describe('Issue #1232', () => {
    describe('transformObjectKeys should not cause variable shadowing with mangled identifiers', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1232.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                identifierNamesGenerator: 'mangled',
                transformObjectKeys: true
            }).getObfuscatedCode();
        });

        it('should not rename extracted object variable to same name as function parameter', () => {
            const shadowingPattern = /(\w+)\s*===\s*\1[)\s;,]/;

            assert.isFalse(
                shadowingPattern.test(obfuscatedCode),
                `Variable shadowing detected in obfuscated code: ${obfuscatedCode}`
            );
        });
    });
});
