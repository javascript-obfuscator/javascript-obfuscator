import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayRotateFunctionTransformer', () => {
    describe('Code helper append', () => {
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

        describe('`stringArrayThreshold` option is `0.00001`', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        rotateStringArray: true,
                        stringArray: true,
                        stringArrayThreshold: 0.00001
                    }
                ).getObfuscatedCode();
            });

            it('should correctly append code helper into the obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('`stringArrayThreshold` option is `0`', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        rotateStringArray: true,
                        stringArray: true,
                        stringArrayThreshold: 0
                    }
                ).getObfuscatedCode();
            });

            it('should correctly append code helper into the obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Input code has no string literals', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/no-string-literals.js');

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

            it('shouldn\'t append code helper into the obfuscated code', () => {
                assert.notMatch(obfuscatedCode, regExp);
            });
        });
    });
});
