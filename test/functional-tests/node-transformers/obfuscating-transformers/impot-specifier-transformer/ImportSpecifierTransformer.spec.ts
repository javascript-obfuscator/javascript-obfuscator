import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ImportSpecifierTransformer', () => {
    describe('transformation of `importSpecifier` node identifiers', () => {
        describe('Variant #1: `defaultImportSpecifier` node', () => {
            const importSpecifierRegExp: RegExp = /import (_0x[a-f0-9]{4,6}) from *'\.\/foo';/;
            const consoleLogRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;

            let obfuscatedCode: string,
                importSpecifierIdentifier: string,
                consoleLogIdentifier: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/default-import.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
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
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
                importSpecifierIdentifier = getRegExpMatch(obfuscatedCode, importSpecifierRegExp);
                consoleLogIdentifier = getRegExpMatch(obfuscatedCode, consoleLogRegExp);
            });

            it('should transform import specifier identifier name', () => {
                assert.equal(importSpecifierIdentifier, consoleLogIdentifier);
            });
        });

        describe('Variant #3: `importSpecifier` node', () => {
            const importSpecifierRegExp: RegExp = /import *{foo} *from *'\.\/foo';/;
            const consoleLogRegExp: RegExp = /console\['log']\(foo\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/named-import.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Match #1: shouldn\'t transform import specifier identifier name', () => {
                assert.match(obfuscatedCode, importSpecifierRegExp);
            });

            it('Match #2: shouldn\'t transform import specifier identifier name', () => {
                assert.match(obfuscatedCode, consoleLogRegExp);
            });
        });
    });
});
