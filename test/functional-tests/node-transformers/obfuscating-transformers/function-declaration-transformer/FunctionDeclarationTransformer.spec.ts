import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('FunctionDeclarationTransformer', () => {
    describe('transformation of `functionDeclaration` node names', () => {
        describe('variant #1: `functionDeclaration` parent block scope is not a `ProgramNode`', () => {
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
                        ...NO_CUSTOM_NODES_PRESET
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

        describe('variant #2: `functionDeclaration` parent block scope is a `ProgramNode`', () => {
            describe('variant #1: `renameGlobals` option is disabled', () => {
                const functionNameIdentifierRegExp: RegExp = /function *foo *\(\) *\{/;
                const functionCallIdentifierRegExp: RegExp = /foo *\( *\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/parent-block-scope-is-program-node.js');
                    const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_CUSTOM_NODES_PRESET
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

            describe('variant #2: `renameGlobals` option is enabled', () => {
                const functionNameIdentifierRegExp: RegExp = /function *(_0x[a-f0-9]{4,6}) *\(\) *\{/;
                const functionCallIdentifierRegExp: RegExp = /(_0x[a-f0-9]{4,6}) *\( *\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/parent-block-scope-is-program-node.js');
                    const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_CUSTOM_NODES_PRESET,
                            renameGlobals: true
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
        });

        describe('variant #3: generator `functionDeclaration`', () => {
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
                        ...NO_CUSTOM_NODES_PRESET
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

        describe('variant #4: async `functionDeclaration`', () => {
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
                        ...NO_CUSTOM_NODES_PRESET
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
    });
});
