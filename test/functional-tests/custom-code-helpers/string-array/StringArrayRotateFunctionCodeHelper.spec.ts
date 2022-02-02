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
                        stringArrayRotate: true,
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
                        stringArrayRotate: false,
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

    describe('Comparison expression', () => {
        describe('Should add comparison expression to the code helper', () => {
            const comparisonExpressionRegExp: RegExp = /var _0x([a-f0-9]){4,6} *= *-?parseInt\(_0x([a-f0-9]){4,6}\(0x.\)\)/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArrayRotate: true,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should add comparison expression to the code', () => {
                assert.match(obfuscatedCode, comparisonExpressionRegExp);
            });
        });
    });

    describe('Preserve string array name', () => {
        const arrayRotateRegExp: RegExp = /e\['push']\(e\['shift']\(\)\);/;
        const comparisonRegExp: RegExp = /if *\(f *=== *d\) *{/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                    stringArrayRotate: true,
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
