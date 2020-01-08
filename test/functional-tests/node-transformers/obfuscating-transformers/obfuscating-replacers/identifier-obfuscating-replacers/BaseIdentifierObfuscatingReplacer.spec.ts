import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

describe('BaseIdentifierObfuscatingReplacer', () => {
    describe('Base rule', () => {
        describe('Variant #1: default behaviour', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

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
                    /var *abc *= *0x1; *var *_0x([a-f0-9]){4,6} *= *0x2; *var *ghi *= *0x3;/
                );
            });
        });
    });
});
