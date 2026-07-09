import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1419
//
describe('Issue #1419', () => {
    describe('`in` operator inside an arrow concise body within a `for`-init', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1419.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                compact: true
            }).getObfuscatedCode();
        });

        it('should produce syntactically valid code (keep the `in` parentheses in the `for`-init NoIn context)', () => {
            assert.doesNotThrow(() => new Function(obfuscatedCode));
        });
    });
});
