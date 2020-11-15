import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';
import { stubNodeTransformers } from '../../../../helpers/stubNodeTransformers';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { ObjectPatternPropertiesTransformer } from '../../../../../src/node-transformers/converting-transformers/ObjectPatternPropertiesTransformer';

describe('VariablePreserveTransformer', () => {
    describe('Variant #1: string array storage name conflicts with identifier name', () => {
        describe('Variant #1: `renameGlobals` option is disabled', () => {
            const stringArrayStorageNameRegExp: RegExp = /const b *= *\['abc'];/;
            const identifierNameRegExp: RegExp = /const a *= *c\(0x0\);/;

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
            const identifierNameRegExp: RegExp = /const d *= *c\(0x0\);/;

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
            const transformObjectKeysNameRegExp: RegExp = /const c *= *{};/;
            const identifierNameRegExp: RegExp = /const d *= *c;/;

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

    describe('Variant #4: destructed object property identifier name conflict with identifier name', () => {
        stubNodeTransformers([ObjectPatternPropertiesTransformer]);

        describe('Variant #1: `renameGlobals` option is disabled', () => {
            const variableDeclarationIdentifierName: RegExp = /var b *= *0x1;/;
            const destructedObjectPropertyIdentifierName: RegExp = /const { *a *} *= *{ *'a' *: *0x2 *};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/destructed-object-property-identifier-name-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: 'mangled',
                        renameGlobals: false
                    }
                ).getObfuscatedCode();
            });

            it('should generate non-preserved name for variable name', () => {
                assert.match(obfuscatedCode, variableDeclarationIdentifierName);
            });

            it('should keep the original name for destructed object property identifier', () => {
                assert.match(obfuscatedCode, destructedObjectPropertyIdentifierName);
            });
        });

        describe('Variant #2: `renameGlobals` option is enabled', () => {
            const variableDeclarationIdentifierName: RegExp = /var b *= *0x1;/;
            const functionDeclarationIdentifierName: RegExp = /function c *\(\) *{/;
            const destructedObjectPropertyIdentifierName: RegExp = /const { *a *} *= *{ *'a' *: *0x2 *};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/destructed-object-property-identifier-name-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: 'mangled',
                        renameGlobals: true
                    }
                ).getObfuscatedCode();
            });

            it('should generate non-preserved name for variable declaration', () => {
                assert.match(obfuscatedCode, variableDeclarationIdentifierName);
            });

            it('should generate non-preserved name for function declaration', () => {
                assert.match(obfuscatedCode, functionDeclarationIdentifierName);
            });

            it('should keep the original name for destructed object property identifier', () => {
                assert.match(obfuscatedCode, destructedObjectPropertyIdentifierName);
            });
        });

        describe('Variant #3: function destructed object property', () => {
            const variableDeclarationIdentifierName: RegExp = /var b *= *0x1;/;
            const destructedObjectPropertyIdentifierName: RegExp = /return *\({ *a *}\) *=> *{/;
            const consoleLogIdentifierNames: RegExp = /console\['log']\(b, *a\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/destructed-object-property-identifier-name-3.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: 'mangled',
                        renameGlobals: false
                    }
                ).getObfuscatedCode();
            });

            it('should generate non-preserved name for variable declaration', () => {
                assert.match(obfuscatedCode, variableDeclarationIdentifierName);
            });

            it('should keep the original name for destructed object property identifier', () => {
                assert.match(obfuscatedCode, destructedObjectPropertyIdentifierName);
            });

            it('should generate valid identifier names for console.log call', () => {
                assert.match(obfuscatedCode, consoleLogIdentifierNames);
            });
        });
    });
});
