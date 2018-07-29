import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayRotateFunctionNode', () => {
    const regExp: RegExp = /while *\(-- *_0x([a-f0-9]){4,6}\) *\{/;

    describe('`stringArray` option is set', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    rotateStringArray: true,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('should correctly append custom node into the obfuscated code', () => {
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
                    rotateStringArray: false,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('shouldn\'t append custom node into the obfuscated code', () => {
            assert.notMatch(obfuscatedCode, regExp);
        });
    });
});
