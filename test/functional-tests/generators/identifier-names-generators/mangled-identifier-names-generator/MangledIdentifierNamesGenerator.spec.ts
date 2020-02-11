import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('MangledIdentifierNamesGenerator', () => {
    describe('generateWithPrefix', () => {
        describe('Variant #1: should not generate same name for string array as existing name in code', () => {
            describe('Variant #1: `renameGlobals` option is disabled', () => {
                const stringArrayStorageRegExp: RegExp = /const ab *= *\['abc'];/;
                const lastVariableDeclarationIdentifierNameRegExp: RegExp = /const aa *= *ac\('0x0'\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-name-conflict-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            identifiersPrefix: 'a',
                            transformObjectKeys: true,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('Match #1: should generate correct identifier for string array', () => {
                    assert.match(obfuscatedCode, stringArrayStorageRegExp);
                });

                it('Match #2: should keep identifier name for last variable declaration', () => {
                    assert.match(obfuscatedCode, lastVariableDeclarationIdentifierNameRegExp);
                });
            });

            describe('Variant #2: `renameGlobals` option is enabled', () => {
                const stringArrayStorageRegExp: RegExp = /const ab *= *\['abc'];/;
                const lastVariableDeclarationIdentifierNameRegExp: RegExp = /const aB *= *ac\('0x0'\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-name-conflict-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            identifiersPrefix: 'a',
                            renameGlobals: true,
                            transformObjectKeys: true,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('Match #1: should generate correct identifier for string array', () => {
                    assert.match(obfuscatedCode, stringArrayStorageRegExp);
                });

                it('Match #2: should keep identifier name for last variable declaration', () => {
                    assert.match(obfuscatedCode, lastVariableDeclarationIdentifierNameRegExp);
                });
            });
        });

        describe('Variant #2: should not generate same prefixed name for identifier in code as prefixed name of string array', () => {
            describe('Variant #1: `renameGlobals` option is disabled', () => {
                const stringArrayStorageRegExp: RegExp = /const aa *= *\['abc', *'last'];/;
                const functionDeclarationIdentifierNameRegExp: RegExp = /function foo *\(\) *{/;
                const lastVariableDeclarationIdentifierNameRegExp: RegExp = /const ac *= *ab\('0x1'\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-name-conflict-2.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            identifiersPrefix: 'a',
                            transformObjectKeys: true,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('Match #1: should generate correct identifier name for string array', () => {
                    assert.match(obfuscatedCode, stringArrayStorageRegExp);
                });

                it('Match #2: should keep identifier name for function declaration', () => {
                    assert.match(obfuscatedCode, functionDeclarationIdentifierNameRegExp);
                });

                it('Match #3: should keep identifier name for last variable declaration', () => {
                    assert.match(obfuscatedCode, lastVariableDeclarationIdentifierNameRegExp);
                });
            });

            describe('Variant #2: `renameGlobals` option is enabled', () => {
                const stringArrayStorageRegExp: RegExp = /const aa *= *\['abc', *'last'];/;
                const functionDeclarationIdentifierNameRegExp: RegExp = /function ac *\(\) *{/;
                const lastVariableDeclarationIdentifierNameRegExp: RegExp = /const ad *= *ab\('0x1'\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-name-conflict-2.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            identifiersPrefix: 'a',
                            renameGlobals: true,
                            transformObjectKeys: true,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('Match #1: should generate correct identifier name for string array', () => {
                    assert.match(obfuscatedCode, stringArrayStorageRegExp);
                });

                it('Match #2: should generate correct identifier name for function declaration', () => {
                    assert.match(obfuscatedCode, functionDeclarationIdentifierNameRegExp);
                });

                it('Match #3: should keep identifier name for last variable declaration', () => {
                    assert.match(obfuscatedCode, lastVariableDeclarationIdentifierNameRegExp);
                });
            });
        });
    });
});
