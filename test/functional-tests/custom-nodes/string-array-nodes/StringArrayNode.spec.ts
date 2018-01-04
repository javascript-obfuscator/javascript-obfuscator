import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayNode', () => {
    const regExp: RegExp = /^var _0x([a-f0-9]){4} *= *\[/;

    describe('`stringArray` option is set', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should correctly append custom node into the obfuscated code', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('`stringArray` option isn\'t set', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: false
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('shouldn\'t append custom node into the obfuscated code', () => {
            assert.notMatch(obfuscatedCode, regExp);
        });
    });
});
