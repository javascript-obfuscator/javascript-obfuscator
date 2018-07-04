import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('DebugProtectionFunctionIntervalTemplate', () => {
    describe('Variant #1: correctly obfuscated code`', () => {
        const regExp: RegExp = /setInterval/;

        let obfuscatedCode: string;

        beforeEach(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    debugProtection: true,
                    debugProtectionInterval: true
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should correctly add debug protection function interval node', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });
});
