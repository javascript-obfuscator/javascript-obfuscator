import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1410
//
describe('Issue #1410', () => {
    describe('ES2025 RegExp pattern modifiers should be parsed without errors', () => {
        describe('inline case-insensitive modifier `(?i:...)`', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = `console.log(/(?i:abc)/.test('ABC'));`;

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET
                }).getObfuscatedCode();
            });

            it('should not throw an `Invalid regular expression` error and should preserve the regex literal', () => {
                assert.match(obfuscatedCode, /\/\(\?i:abc\)\//);
            });

            it('should produce semantically equivalent code', () => {
                assert.isTrue(eval(`/(?i:abc)/.test('ABC')`));
            });
        });

        describe('disabled modifier `(?-i:...)` within a case-insensitive regex', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = `console.log(/(?-i:abc)/i.test('ABC'));`;

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET
                }).getObfuscatedCode();
            });

            it('should not throw an `Invalid regular expression` error and should preserve the regex literal', () => {
                assert.match(obfuscatedCode, /\/\(\?-i:abc\)\/i/);
            });
        });
    });
});
