import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('DictionaryIdentifierNamesGenerator', () => {
    describe('generateWithPrefix', () => {
        describe('Variant #1: should not generate same name for string array as existing name in code', () => {
            describe('Variant #1: `renameGlobals` option is disabled', () => {
                const stringArrayStorageRegExp: RegExp = /const a[aB] *= *\['abc'];/;
                const variableDeclarationIdentifierNameRegExp: RegExp = /const ab *= *a[abAB]\('0x0'\);/;

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
                const lastVariableDeclarationIdentifierNameRegExp: RegExp = /const a[AB] *= *a[AB]\('0x0'\);/;

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
    });
});
