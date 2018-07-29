import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ImportDeclarationTransformer', () => {
    describe('transformation of `importSpecifier` node identifiers', () => {
        describe('Variant #1: `defaultImportSpecifier` node', () => {
            const importSpecifierRegExp: RegExp = /import (_0x[a-f0-9]{4,6}) from *'\.\/foo';/;
            const consoleLogRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;

            let obfuscatedCode: string,
                importSpecifierIdentifier: string,
                consoleLogIdentifier: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/default-import.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
                importSpecifierIdentifier = getRegExpMatch(obfuscatedCode, importSpecifierRegExp);
                consoleLogIdentifier = getRegExpMatch(obfuscatedCode, consoleLogRegExp);
            });

            it('should transform import specifier identifier name', () => {
                assert.equal(importSpecifierIdentifier, consoleLogIdentifier);
            });
        });

        describe('Variant #2: `namespaceImportSpecifier` node', () => {
            const importSpecifierRegExp: RegExp = /import *\* *as *(_0x[a-f0-9]{4,6}) *from *'\.\/foo';/;
            const consoleLogRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;

            let obfuscatedCode: string,
                importSpecifierIdentifier: string,
                consoleLogIdentifier: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/namespace-import.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
                importSpecifierIdentifier = getRegExpMatch(obfuscatedCode, importSpecifierRegExp);
                consoleLogIdentifier = getRegExpMatch(obfuscatedCode, consoleLogRegExp);
            });

            it('should transform import specifier identifier name', () => {
                assert.equal(importSpecifierIdentifier, consoleLogIdentifier);
            });
        });

        describe('Variant #3: named `importSpecifier` node', () => {
            describe('Variant #1: named import specifier with same `import` and `local` names', () => {
                const importSpecifierRegExp: RegExp = /import *{foo} *from *'\.\/foo';/;
                const consoleLogRegExp: RegExp = /console\['log']\(foo\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/named-import-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET
                        }
                    ).getObfuscatedCode();
                });

                it('Match #1: shouldn\'t transform import specifier identifier name', () => {
                    assert.match(obfuscatedCode, importSpecifierRegExp);
                });

                it('Match #2: shouldn\'t transform import specifier identifier name', () => {
                    assert.match(obfuscatedCode, consoleLogRegExp);
                });
            });

            describe('Variant #2: named import specifier with different `import` and `local` names', () => {
                const importSpecifierRegExp: RegExp = /import *{foo as (_0x[a-f0-9]{4,6})} *from *'\.\/foo';/;
                const consoleLogRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;

                let obfuscatedCode: string,
                    importSpecifierIdentifier: string,
                    consoleLogIdentifier: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/named-import-2.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET
                        }
                    ).getObfuscatedCode();
                    importSpecifierIdentifier = getRegExpMatch(obfuscatedCode, importSpecifierRegExp);
                    consoleLogIdentifier = getRegExpMatch(obfuscatedCode, consoleLogRegExp);
                });

                it('should transform import specifier identifier name', () => {
                    assert.equal(importSpecifierIdentifier, consoleLogIdentifier);
                });
            });
        });

        describe('Variant #4: `identifiersPrefix` option', () => {
            const importSpecifierRegExp: RegExp = /import *\* *as *(bark_0x[a-f0-9]{4,6}) *from *'\.\/foo';/;
            const consoleLogRegExp: RegExp = /console\['log']\((bark_0x[a-f0-9]{4,6})\);/;

            let obfuscatedCode: string,
                importSpecifierIdentifier: string,
                consoleLogIdentifier: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/namespace-import.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifiersPrefix: 'bark'
                    }
                ).getObfuscatedCode();
                importSpecifierIdentifier = getRegExpMatch(obfuscatedCode, importSpecifierRegExp);
                consoleLogIdentifier = getRegExpMatch(obfuscatedCode, consoleLogRegExp);
            });

            it('should transform import specifier identifier name', () => {
                assert.equal(importSpecifierIdentifier, consoleLogIdentifier);
            });
        });
    });
});
