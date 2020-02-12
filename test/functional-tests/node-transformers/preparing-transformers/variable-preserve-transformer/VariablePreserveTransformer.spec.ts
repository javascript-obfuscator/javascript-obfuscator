import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('VariablePreserveTransformer', () => {
    describe('Variant #1: string array storage name conflicts with identifier name', () => {
        describe('Variant #1: `renameGlobals` option is disabled', () => {
            const stringArrayStorageNameRegExp: RegExp = /const b *= *\['abc'];/;
            const identifierNameRegExp: RegExp = /const a *= *c\('0x0'\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-identifier-name-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: 'mangled',
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should generate non-preserved name for string array storage', () => {
                assert.match(obfuscatedCode, stringArrayStorageNameRegExp);
            });

            it('should keep the original name for global identifier', () => {
                assert.match(obfuscatedCode, identifierNameRegExp);
            });
        });

        describe('Variant #2: `renameGlobals` option is enabled', () => {
            const stringArrayStorageNameRegExp: RegExp = /const b *= *\['abc'];/;
            const identifierNameRegExp: RegExp = /const d *= *c\('0x0'\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-identifier-name-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: 'mangled',
                        renameGlobals: true,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should generate non-preserved name for string array storage', () => {
                assert.match(obfuscatedCode, stringArrayStorageNameRegExp);
            });

            it('should rename global identifier', () => {
                assert.match(obfuscatedCode, identifierNameRegExp);
            });
        });
    });

    describe('Variant #2: `transformObjectKeys` identifier name conflicts with identifier name', () => {
        describe('Variant #1: `renameGlobals` option is disabled', () => {
            const transformObjectKeysNameRegExp: RegExp = /const b *= *{};/;
            const identifierNameRegExp: RegExp = /const a *= *b;/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/transform-object-keys-identifier-name-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: 'mangled',
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should generate non-preserved name for `transformObjectKeys` identifier', () => {
                assert.match(obfuscatedCode, transformObjectKeysNameRegExp);
            });

            it('should keep the original name for global identifier', () => {
                assert.match(obfuscatedCode, identifierNameRegExp);
            });
        });

        describe('Variant #2: `renameGlobals` option is enabled', () => {
            const transformObjectKeysNameRegExp: RegExp = /const b *= *{};/;
            const identifierNameRegExp: RegExp = /const c *= *b;/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/transform-object-keys-identifier-name-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: 'mangled',
                        renameGlobals: true,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should generate non-preserved name for `transformObjectKeys` identifier', () => {
                assert.match(obfuscatedCode, transformObjectKeysNameRegExp);
            });

            it('should keep the original name for global identifier', () => {
                assert.match(obfuscatedCode, identifierNameRegExp);
            });
        });
    });

    describe('Variant #3: ignored node identifier name conflict with identifier name', () => {
        describe('Variant #1: global scope', () => {
            const functionExpressionIdentifierName: RegExp = /const c *= *function *\(\) *{};/;
            const functionDeclarationIdentifierName: RegExp = /function a *\(\) *{}/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/ignored-node-identifier-name-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: 'mangled',
                        renameGlobals: true
                    }
                ).getObfuscatedCode();
            });

            it('should generate non-preserved name for global identifier', () => {
                assert.match(obfuscatedCode, functionExpressionIdentifierName);
            });

            it('should keep the original name for ignored identifier', () => {
                assert.match(obfuscatedCode, functionDeclarationIdentifierName);
            });
        });
    });
});
