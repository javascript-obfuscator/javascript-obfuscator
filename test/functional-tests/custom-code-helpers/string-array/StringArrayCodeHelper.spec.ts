import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { getStringArrayRegExp } from '../../../helpers/get-string-array-regexp';
import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayCodeHelper', () => {
    const regExp: RegExp = getStringArrayRegExp(['test']);

    describe('`stringArray` option is set', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('should correctly append code helper into the obfuscated code', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('`stringArray` option isn\'t set', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: false
                }
            ).getObfuscatedCode();
        });

        it('shouldn\'t append code helper into the obfuscated code', () => {
            assert.notMatch(obfuscatedCode, regExp);
        });
    });
});
