import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

describe('FunctionDeclarationTransformer', () => {
    describe('transformation of `functionDeclaration` node names', () => {
        describe('Variant #1: `functionDeclaration` parent block scope is not a `ProgramNode`', () => {
            const functionNameIdentifierRegExp: RegExp = /function *(_0x[a-f0-9]{4,6}) *\(\) *\{/;
            const functionCallIdentifierRegExp: RegExp = /(_0x[a-f0-9]{4,6}) *\( *\);/;

            let obfuscatedCode: string,
                functionNameIdentifier: string,
                functionCallIdentifier: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
                functionNameIdentifier = getRegExpMatch(obfuscatedCode, functionNameIdentifierRegExp);
                functionCallIdentifier = getRegExpMatch(obfuscatedCode, functionCallIdentifierRegExp);
            });

            it('should transform function name', () => {
                assert.equal(functionNameIdentifier, functionCallIdentifier);
            });
        });

        describe('Variant #2: `functionDeclaration` parent block scope is a `ProgramNode`', () => {
            describe('Variant #1: `renameGlobals` option is disabled', () => {
                const functionNameIdentifierRegExp: RegExp = /function *foo *\(\) *\{/;
                const functionCallIdentifierRegExp: RegExp = /foo *\( *\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/parent-block-scope-is-program-node.js');
                    const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET
                        }
                    );

                    obfuscatedCode = obfuscationResult.getObfuscatedCode();
                });

                it('match #1: shouldn\'t transform function name', () => {
                    assert.match(obfuscatedCode, functionNameIdentifierRegExp);
                });

                it('match #2: shouldn\'t transform function name', () => {
                    assert.match(obfuscatedCode, functionCallIdentifierRegExp);
                });
            });

            describe('Variant #2: `renameGlobals` option is enabled', () => {
                const functionNameIdentifierRegExp: RegExp = /function *(_0x[a-f0-9]{4,6}) *\(\) *\{/;
                const functionCallIdentifierRegExp: RegExp = /(_0x[a-f0-9]{4,6}) *\( *\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/parent-block-scope-is-program-node.js');
                    const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameGlobals: true
                        }
                    );

                    obfuscatedCode = obfuscationResult.getObfuscatedCode();
                });

                it('match #1: should transform function name', () => {
                    assert.match(obfuscatedCode, functionNameIdentifierRegExp);
                });

                it('match #2: should transform function name', () => {
                    assert.match(obfuscatedCode, functionCallIdentifierRegExp);
                });
            });
        });

        describe('Variant #3: generator `functionDeclaration`', () => {
            const functionNameIdentifierRegExp: RegExp = /function *\* *(_0x[a-f0-9]{4,6}) *\(\) *\{/;
            const functionCallIdentifierRegExp: RegExp = /let *_0x[a-f0-9]{4,6} *= *(_0x[a-f0-9]{4,6}) *\( *\);/;

            let obfuscatedCode: string,
                functionNameIdentifier: string,
                functionCallIdentifier: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/generator-function.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
                functionNameIdentifier = getRegExpMatch(obfuscatedCode, functionNameIdentifierRegExp);
                functionCallIdentifier = getRegExpMatch(obfuscatedCode, functionCallIdentifierRegExp);
            });

            it('should transform generator function name', () => {
                assert.equal(functionNameIdentifier, functionCallIdentifier);
            });
        });

        describe('Variant #4: async `functionDeclaration`', () => {
            const functionNameIdentifierRegExp: RegExp = /async *function *(_0x[a-f0-9]{4,6}) *\(\) *\{/;
            const functionCallIdentifierRegExp: RegExp = /await *(_0x[a-f0-9]{4,6}) *\( *\);/;

            let obfuscatedCode: string,
                functionNameIdentifier: string,
                functionCallIdentifier: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/async-function.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
                functionNameIdentifier = getRegExpMatch(obfuscatedCode, functionNameIdentifierRegExp);
                functionCallIdentifier = getRegExpMatch(obfuscatedCode, functionCallIdentifierRegExp);
            });

            it('should transform async function name', () => {
                assert.equal(functionNameIdentifier, functionCallIdentifier);
            });
        });

        describe('Variant #5: already renamed identifiers shouldn\'t be renamed twice', () => {
            describe('Variant #1', () => {
                const functionDeclarationRegExp: RegExp = /function *d\(\) *{/;
                const variableDeclarationsRegExp: RegExp = /let *e, *f, *g, *h;/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/prevent-renaming-of-renamed-identifiers-1.js');
                    const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                        }
                    );

                    obfuscatedCode = obfuscationResult.getObfuscatedCode();
                });

                it('Match #1: shouldn\'t rename twice function declaration name', () => {
                    assert.match(obfuscatedCode, functionDeclarationRegExp);
                });

                it('Match #2: should correctly rename variable declarations', () => {
                    assert.match(obfuscatedCode, variableDeclarationsRegExp);
                });
            });
        });
    });
});
