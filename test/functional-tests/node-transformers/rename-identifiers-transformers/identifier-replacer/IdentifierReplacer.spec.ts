import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('IdentifierReplacer', () => {
    describe('Reserved names', () => {
        describe('Variant #1: ignore local reserved names', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/local-reserved-names.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        reservedNames: ['[abc|ghi]']
                    }
                ).getObfuscatedCode();
            });

            it('Should keep reserved names without transformations when `reservedNames` option is enabled', () => {
                assert.match(
                    obfuscatedCode,
                    /var abc *= *0x1; *var _0x([a-f0-9]){4,6} *= *0x2; *var ghi *= *0x3;/
                );
            });
        });

        describe('Variant #1: ignore global reserved names', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/global-reserved-names.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true,
                        reservedNames: ['[abc|ghi]']
                    }
                ).getObfuscatedCode();
            });

            it('Should keep reserved names without transformations when `reservedNames` option is enabled', () => {
                assert.match(
                    obfuscatedCode,
                    /var abc *= *0x1; *var _0x([a-f0-9]){4,6} *= *0x2; *var ghi *= *0x3;/
                );
            });
        });
    });
});
