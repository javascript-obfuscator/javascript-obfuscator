import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayRotateFunctionCodeHelper', () => {
    describe('Base behaviour', () => {
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
                        rotateStringArray: false,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t append code helper into the obfuscated code', () => {
                assert.notMatch(obfuscatedCode, regExp);
            });
        });
    });

    describe('Preserve string array name', () => {
        const rotateLogicRegExp: RegExp = /b\['push']\(b\['shift']\(\)\);/;
        const incrementRegExp: RegExp = /f\(\+\+e\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                    rotateStringArray: true,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('should preserve string array name', () => {
            assert.match(obfuscatedCode, rotateLogicRegExp);
        });

        it('generate valid identifier names', () => {
            assert.match(obfuscatedCode, incrementRegExp);
        });
    });
});
