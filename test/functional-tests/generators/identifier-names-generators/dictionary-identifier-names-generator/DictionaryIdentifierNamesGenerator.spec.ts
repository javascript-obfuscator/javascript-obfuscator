import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { getStringArrayRegExp } from '../../../../helpers/get-string-array-regexp';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('DictionaryIdentifierNamesGenerator', () => {
    describe('generateWithPrefix', () => {
        describe('Variant #1: should not generate same name for string array as existing name in code', () => {
            describe('Variant #1: `renameGlobals` option is disabled', () => {
                const stringArrayStorageRegExp: RegExp = getStringArrayRegExp(
                    ['_aa', '_ab'],
                    {
                        name: '\\w*',
                        kind: 'const'
                    }
                );
                const variableDeclarationIdentifierNameRegExp1: RegExp = /const (\w*) *= *\w*\(0x0\);/;
                const variableDeclarationIdentifierNameRegExp2: RegExp = /const (\w*) *= *\w*\(0x1\);/;

                let stringArrayName: string = '';
                let variableDeclarationIdentifierName1: string = '';
                let variableDeclarationIdentifierName2: string = '';
                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-name-conflict-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
                            identifiersDictionary: ['a', 'b', 'c'],
                            identifiersPrefix: 'a',
                            transformObjectKeys: true,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    stringArrayName = getRegExpMatch(obfuscatedCode, stringArrayStorageRegExp);
                    variableDeclarationIdentifierName1 = getRegExpMatch(
                        obfuscatedCode,
                        variableDeclarationIdentifierNameRegExp1
                    );
                    variableDeclarationIdentifierName2 = getRegExpMatch(
                        obfuscatedCode,
                        variableDeclarationIdentifierNameRegExp2
                    );
                });

                it('Should generate correct identifier for string array', () => {
                    assert.match(obfuscatedCode, stringArrayStorageRegExp);
                });

                it('Should keep identifier name for existing variable declaration #1', () => {
                    assert.notEqual(stringArrayName, variableDeclarationIdentifierName1);
                });

                it('Should keep identifier name for existing variable declaration #2', () => {
                    assert.notEqual(stringArrayName, variableDeclarationIdentifierName2);
                });
            });

            describe('Variant #2: `renameGlobals` option is enabled', () => {
                const stringArrayStorageRegExp: RegExp = getStringArrayRegExp(
                    ['_aa', '_ab'],
                    {
                        name: '\\w*',
                        kind: 'const'
                    }
                );
                const variableDeclarationIdentifierNameRegExp1: RegExp = /const (\w*) *= *\w*\(0x0\);/;
                const variableDeclarationIdentifierNameRegExp2: RegExp = /const (\w*) *= *\w*\(0x1\);/;

                let stringArrayName: string = '';
                let variableDeclarationIdentifierName1: string = '';
                let variableDeclarationIdentifierName2: string = '';
                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-name-conflict-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
                            identifiersDictionary: ['a', 'b', 'c', 'd'],
                            identifiersPrefix: 'a',
                            renameGlobals: true,
                            transformObjectKeys: true,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    stringArrayName = getRegExpMatch(obfuscatedCode, stringArrayStorageRegExp);
                    variableDeclarationIdentifierName1 = getRegExpMatch(
                        obfuscatedCode,
                        variableDeclarationIdentifierNameRegExp1
                    );
                    variableDeclarationIdentifierName2 = getRegExpMatch(
                        obfuscatedCode,
                        variableDeclarationIdentifierNameRegExp2
                    );
                });

                it('Should generate correct identifier for string array', () => {
                    assert.match(obfuscatedCode, stringArrayStorageRegExp);
                });

                it('Should keep identifier name for existing variable declaration #1', () => {
                    assert.notEqual(stringArrayName, variableDeclarationIdentifierName1);
                });

                it('Should keep identifier name for existing variable declaration #2', () => {
                    assert.notEqual(stringArrayName, variableDeclarationIdentifierName2);
                });
            });
        });

        describe('Variant #2: should not generate same prefixed name for identifier in code as prefixed name of string array', function () {
            this.timeout(10000);

            const samplesCount: number = 30;

            describe('Variant #1: `renameGlobals` option is disabled', () => {
                const stringArrayStorageRegExp: RegExp = getStringArrayRegExp(
                    ['first', 'abc'],
                    {
                        name: '\\w*',
                        kind: 'const'
                    }
                );
                const variableDeclarationIdentifierNameRegExp: RegExp = /const (\w*) *= *\w*\(0x0\);/;

                let isIdentifiersAreConflicted: boolean = false;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-name-conflict-2.js');

                    for (let i = 0; i < samplesCount; i++) {
                        const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                identifierNamesGenerator: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
                                identifiersDictionary: ['a', 'b', 'aa'],
                                identifiersPrefix: 'a',
                                transformObjectKeys: true,
                                stringArray: true,
                                stringArrayThreshold: 1
                            }
                        ).getObfuscatedCode();

                        const stringArrayStorageName: string = getRegExpMatch(obfuscatedCode, stringArrayStorageRegExp);
                        const variableDeclarationIdentifierName: string = getRegExpMatch(obfuscatedCode, variableDeclarationIdentifierNameRegExp);

                        if (stringArrayStorageName === variableDeclarationIdentifierName) {
                            isIdentifiersAreConflicted = true;

                            break;
                        }
                    }
                });

                it('Should not generate same name for string array and last variable', () => {
                    assert.equal(isIdentifiersAreConflicted, false);
                });
            });

            describe('Variant #2: `renameGlobals` option is enabled', () => {
                const stringArrayStorageRegExp: RegExp = getStringArrayRegExp(
                    ['first', 'abc'],
                    {
                        name: '\\w*',
                        kind: 'const'
                    }
                );
                const variableDeclarationIdentifierNameRegExp: RegExp = /const (\w*) *= *\w*\(0x0\);/;

                let isIdentifiersAreConflicted: boolean = false;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-name-conflict-2.js');

                    for (let i = 0; i < samplesCount; i++) {
                        const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                identifierNamesGenerator: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
                                identifiersDictionary: ['a', 'b', 'aa'],
                                identifiersPrefix: 'a',
                                renameGlobals: true,
                                transformObjectKeys: true,
                                stringArray: true,
                                stringArrayThreshold: 1
                            }
                        ).getObfuscatedCode();

                        const stringArrayStorageName: string = getRegExpMatch(obfuscatedCode, stringArrayStorageRegExp);
                        const variableDeclarationIdentifierName: string = getRegExpMatch(obfuscatedCode, variableDeclarationIdentifierNameRegExp);

                        if (stringArrayStorageName === variableDeclarationIdentifierName) {
                            isIdentifiersAreConflicted = true;

                            break;
                        }
                    }
                });

                it('Should not generate same name for string array and last variable', () => {
                    assert.equal(isIdentifiersAreConflicted, false);
                });
            });
        });
    });
});
