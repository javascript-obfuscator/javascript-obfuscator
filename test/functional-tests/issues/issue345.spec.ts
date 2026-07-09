import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/345
//
describe('Issue #345', () => {
    describe('Escape sequences of string literals should be preserved', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue345.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET
            }).getObfuscatedCode();
        });

        it('match #1: should keep the unicode escape sequence untouched', () => {
            assert.match(obfuscatedCode, /console\['log'\]\('\\ud83d\\ude03'\);/);
        });

        it('match #2: should keep the un-escaped character untouched', () => {
            assert.match(obfuscatedCode, /console\['log'\]\('😃'\);/);
        });

        it('match #3: should keep the hex escape sequence untouched', () => {
            assert.match(obfuscatedCode, /console\['log'\]\('\\x41\\x42\\x43'\);/);
        });

        it('match #4: should keep the unicode code point escape sequence untouched', () => {
            assert.match(obfuscatedCode, /console\['log'\]\('\\u{1F604}'\);/);
        });
    });

    describe('Escaped and un-escaped variants of the same value should stay distinguishable', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = 'var a = "\\ud83d\\ude03"; var b = "😃";';

            obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET
            }).getObfuscatedCode();
        });

        it('should keep the escaped variant escaped', () => {
            assert.match(obfuscatedCode, /var a *= *'\\ud83d\\ude03';/);
        });

        it('should keep the un-escaped variant un-escaped', () => {
            assert.match(obfuscatedCode, /var b *= *'😃';/);
        });
    });

    describe('Obfuscated code should be runnable and produce the original values', () => {
        let result: string;

        before(() => {
            const code: string = 'return "\\ud83d\\ude03" + "😃" + "\\x41";';

            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET
            }).getObfuscatedCode();

            result = new Function(obfuscatedCode)();
        });

        it('should evaluate to the correct string', () => {
            assert.equal(result, '😃😃A');
        });
    });
});
