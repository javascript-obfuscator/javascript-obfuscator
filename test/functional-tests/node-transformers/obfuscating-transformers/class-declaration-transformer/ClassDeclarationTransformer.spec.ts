import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ClassDeclarationTransformer', () => {
    describe('transformation of `classDeclaration` node names', () => {
        describe('Variant #1: `classDeclaration` parent block scope is not a `ProgramNode`', () => {
            const classNameIdentifierRegExp: RegExp = /class *(_0x[a-f0-9]{4,6}) *\{/;
            const classCallIdentifierRegExp: RegExp = /new *(_0x[a-f0-9]{4,6}) *\( *\);/;

            let obfuscatedCode: string,
                classNameIdentifier: string,
                classCallIdentifier: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
                classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                classCallIdentifier = getRegExpMatch(obfuscatedCode, classCallIdentifierRegExp);
            });

            it('should transform class name', () => {
                assert.equal(classNameIdentifier, classCallIdentifier);
            });
        });

        describe('Variant #2: `classDeclaration` parent block scope is a `ProgramNode`', () => {
            describe('Variant #1: `renameGlobals` option is disabled', () => {
                const classNameIdentifierRegExp: RegExp = /class *Foo *\{/;
                const classCallIdentifierRegExp: RegExp = /new *Foo *\( *\);/;

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

                it('match #1: shouldn\'t transform class name', () => {
                    assert.match(obfuscatedCode, classNameIdentifierRegExp);
                });

                it('match #2: shouldn\'t transform class name', () => {
                    assert.match(obfuscatedCode, classCallIdentifierRegExp);
                });
            });

            describe('Variant #2: `renameGlobals` option is enabled', () => {
                const classNameIdentifierRegExp: RegExp = /class *(_0x[a-f0-9]{4,6}) *\{/;
                const classCallIdentifierRegExp: RegExp = /new *(_0x[a-f0-9]{4,6}) *\( *\);/;

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

                it('match #1: should transform class name', () => {
                    assert.match(obfuscatedCode, classNameIdentifierRegExp);
                });

                it('match #2: should transform class name', () => {
                    assert.match(obfuscatedCode, classCallIdentifierRegExp);
                });
            });
        });
    });
});
