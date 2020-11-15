import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';
import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('DictionaryIdentifierNamesGenerator', () => {
    describe('generateWithPrefix', () => {
        describe('Variant #1: should not generate same name for string array as existing name in code', () => {
            describe('Variant #1: `renameGlobals` option is disabled', () => {
                const stringArrayStorageRegExp: RegExp = /const a[aB] *= *\['abc'];/;
                const variableDeclarationIdentifierNameRegExp: RegExp = /const ab *= *a[abAB]\(0x0\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-name-conflict-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
                            identifiersDictionary: ['a', 'b'],
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
                    assert.match(obfuscatedCode, variableDeclarationIdentifierNameRegExp);
                });
            });

            describe('Variant #2: `renameGlobals` option is enabled', () => {
                const stringArrayStorageRegExp: RegExp = /const a[aB] *= *\['abc'];/;
                const lastVariableDeclarationIdentifierNameRegExp: RegExp = /const a[AB] *= *a[AB]\(0x0\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-storage-name-conflict-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
                            identifiersDictionary: ['a', 'b'],
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

        describe('Variant #2: should not generate same prefixed name for identifier in code as prefixed name of string array', function () {
            this.timeout(10000);

            const samplesCount: number = 20;

            describe('Variant #1: `renameGlobals` option is disabled', () => {
                const stringArrayStorageRegExp: RegExp = /const ([abAB]{1,3}) *= *\['first', *'abc'];/;
                const variableDeclarationIdentifierNameRegExp: RegExp = /const ([abAB]{1,3}){1,2} *= *[abAB]{1,3}\(0x0\);/;

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
                const stringArrayStorageRegExp: RegExp = /const ([abAB]{1,3}) *= *\['first', *'abc'];/;
                const variableDeclarationIdentifierNameRegExp: RegExp = /const ([abAB]{1,3}){1,2} *= *[abAB]{1,3}\(0x0\);/;

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
