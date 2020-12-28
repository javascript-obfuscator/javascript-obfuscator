import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayRotateFunctionCodeHelper', () => {
    describe('Base behaviour', () => {
        const regExp: RegExp = /while *\(!!\[]\) *\{/;

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
        const arrayRotateRegExp: RegExp = /c\['push']\(c\['shift']\(\)\);/;
        const comparisonRegExp: RegExp = /if *\(e *=== *d\) *{/;

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
            assert.match(obfuscatedCode, arrayRotateRegExp);
        });

        it('generate valid identifier names', () => {
            assert.match(obfuscatedCode, comparisonRegExp);
        });
    });
});
