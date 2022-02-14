import { assert } from 'chai';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

import { HIGH_OBFUSCATION_PRESET } from '../../../../../../src/options/presets/HighObfuscation';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

describe('DebugProtectionFunctionIntervalTemplate', function () {
    const variableMatch: string = '_0x([a-f0-9]){4,6}';

    describe('Variant #1 - `high-obfuscation` preset interval', () => {
        const debugProtectionIntervalRegExp: RegExp = new RegExp(
            `${variableMatch}\\['setInterval'\\]\\( *` +
                `${variableMatch}, *` +
                '0xfa0 *' +
            `\\);`
        );

        let obfuscatedCode: string;

        beforeEach(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');
            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    debugProtection: true,
                    debugProtectionInterval: HIGH_OBFUSCATION_PRESET.debugProtectionInterval
                }
            ).getObfuscatedCode();

            console.log(obfuscatedCode);
        });

        it('Should add debug protection interval code with default interval value', () => {
            assert.match(obfuscatedCode, debugProtectionIntervalRegExp);
        });
    });

    describe('Variant #2 - custom interval', () => {
        const debugProtectionIntervalRegExp: RegExp = new RegExp(
            `${variableMatch}\\['setInterval'\\]\\( *` +
                `${variableMatch}, *` +
                '0x64 *' +
            `\\);`
        );

        let obfuscatedCode: string;

        beforeEach(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');
            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    debugProtection: true,
                    debugProtectionInterval: 100
                }
            ).getObfuscatedCode();
        });

        it('Should add debug protection interval code with default interval value', () => {
            assert.match(obfuscatedCode, debugProtectionIntervalRegExp);
        });
    });

    describe('Variant #3 - no interval', () => {
        const debugProtectionIntervalRegExp: RegExp = /setInterval/

        let obfuscatedCode: string;

        beforeEach(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');
            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    debugProtection: true,
                    debugProtectionInterval: 0
                }
            ).getObfuscatedCode();
        });

        it('Should not add debug protection interval code', () => {
            assert.notMatch(obfuscatedCode, debugProtectionIntervalRegExp);
        });
    });
});
