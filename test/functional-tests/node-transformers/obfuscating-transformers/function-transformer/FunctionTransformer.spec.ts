import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('FunctionTransformer', () => {
    describe('identifiers transformation inside `FunctionDeclaration` and `FunctionExpression` node body', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/input.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

        it('should correct transform both function parameter identifier and function body identifier with same name', () => {
            const functionParamIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/var _0x[a-f0-9]{4,6} *= *function *\((_0x[a-f0-9]{4,6})\) *\{/);
            const functionBodyIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/console\['\\x6c\\x6f\\x67'\]\((_0x[a-f0-9]{4,6})\)/);

            const functionParamIdentifierName: string = (<RegExpMatchArray>functionParamIdentifierMatch)[1];
            const functionBodyIdentifierName: string = (<RegExpMatchArray>functionBodyIdentifierMatch)[1];

            assert.equal(functionParamIdentifierName, functionBodyIdentifierName);
        });

        it('shouldn\'t transform other variables in function body', () => {
            assert.equal(/variable *= *0x6;/.test(obfuscatedCode), true);
        });
    });

    describe('object pattern as parameter', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/object-pattern-as-parameter.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

        it('shouldn\'t transform function parameter object pattern identifier', () => {
            const functionParameterMatch: RegExp = /function *\(\{ *bar *\}\) *\{/;
            const functionBodyMatch: RegExp = /return *bar;/;

            assert.match(obfuscatedCode, functionParameterMatch);
            assert.match(obfuscatedCode, functionBodyMatch);
        });
    });

    describe('assignment pattern as parameter', () => {
        describe('literal as right value', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/assignment-pattern-as-parameter-1.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            it('should transform function parameter assignment pattern identifier', () => {
                const functionParameterMatch: RegExp = /function *\(_0x[a-f0-9]{4,6} *= *0x1\) *\{/;
                const functionBodyMatch: RegExp = /return *_0x[a-f0-9]{4,6};/;

                assert.match(obfuscatedCode, functionParameterMatch);
                assert.match(obfuscatedCode, functionBodyMatch);
            });
        });

        describe('identifier as right value', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/assignment-pattern-as-parameter-2.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            const variableDeclarationMatch: RegExp = /var *(_0x[a-f0-9]{4,6}) *= *0x1;/;
            const functionParameterMatch: RegExp = /function *\((_0x[a-f0-9]{4,6}) *= *(_0x[a-f0-9]{4,6})\) *\{/;
            const functionBodyMatch: RegExp = /return *(_0x[a-f0-9]{4,6});/;

            const variableDeclarationIdentifierName: string = obfuscatedCode.match(variableDeclarationMatch)![1];
            const functionParameterIdentifierName: string = obfuscatedCode.match(functionParameterMatch)![1];
            const functionDefaultParameterIdentifierName: string = obfuscatedCode.match(functionParameterMatch)![2];

            const functionBodyIdentifierName: string = obfuscatedCode.match(functionBodyMatch)![1];

            it('should transform function parameter assignment pattern identifier', () => {
                assert.match(obfuscatedCode, variableDeclarationMatch);
                assert.match(obfuscatedCode, functionParameterMatch);
                assert.match(obfuscatedCode, functionBodyMatch);
            });

            it('should keep same names for identifier in variable declaration and default value identifier of function parameter', () => {
                assert.equal(variableDeclarationIdentifierName, functionDefaultParameterIdentifierName);
            });

            it('should keep same names for identifiers in function params and function body', () => {
                assert.equal(functionParameterIdentifierName, functionBodyIdentifierName);
            });
        });

        describe('identifier as right value', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/assignment-pattern-as-parameter-3.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            const variableDeclarationMatch: RegExp = /var *(_0x[a-f0-9]{4,6}) *= *0x1;/;
            const functionParameterMatch: RegExp = /function *\((_0x[a-f0-9]{4,6}), *(_0x[a-f0-9]{4,6}) *= *(_0x[a-f0-9]{4,6})\) *\{/;
            const functionBodyMatch: RegExp = /return *(_0x[a-f0-9]{4,6}) *\+ *(_0x[a-f0-9]{4,6});/;

            const variableDeclarationIdentifierName: string = obfuscatedCode.match(variableDeclarationMatch)![1];
            const functionParameterIdentifierName: string = obfuscatedCode.match(functionParameterMatch)![1];
            const functionDefaultParameterIdentifierName1: string = obfuscatedCode.match(functionParameterMatch)![2];
            const functionDefaultParameterIdentifierName2: string = obfuscatedCode.match(functionParameterMatch)![3];

            const functionBodyIdentifierName1: string = obfuscatedCode.match(functionBodyMatch)![1];
            const functionBodyIdentifierName2: string = obfuscatedCode.match(functionBodyMatch)![2];

            it('should transform function parameter assignment pattern identifier', () => {
                assert.match(obfuscatedCode, variableDeclarationMatch);
                assert.match(obfuscatedCode, functionParameterMatch);
                assert.match(obfuscatedCode, functionBodyMatch);
            });

            it('shouldn\'t keep same names variable declaration identifier and function parameters identifiers', () => {
                assert.notEqual(variableDeclarationIdentifierName, functionParameterIdentifierName);
                assert.notEqual(variableDeclarationIdentifierName, functionDefaultParameterIdentifierName1);
                assert.notEqual(variableDeclarationIdentifierName, functionDefaultParameterIdentifierName2);
            });

            it('should keep same names for identifier in first function parameter and default value identifier of second function parameter', () => {
                assert.equal(functionParameterIdentifierName, functionDefaultParameterIdentifierName2);
            });

            it('should keep same names for identifiers in function params and function body', () => {
                assert.equal(functionParameterIdentifierName, functionBodyIdentifierName1);
                assert.equal(functionDefaultParameterIdentifierName1, functionBodyIdentifierName2);
            });
        });
    });

    describe('array pattern as parameter', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/array-pattern-as-parameter.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

        const functionParameterMatch: RegExp = /function *\(\[(_0x[a-f0-9]{4,6}), *(_0x[a-f0-9]{4,6})\]\) *\{/;
        const functionBodyMatch: RegExp = /return *(_0x[a-f0-9]{4,6}) *\+ *(_0x[a-f0-9]{4,6});/;

        const arrayPatternIdentifierName1: string = obfuscatedCode.match(functionParameterMatch)![1];
        const arrayPatternIdentifierName2: string = obfuscatedCode.match(functionParameterMatch)![2];
        const functionBodyIdentifierName1: string = obfuscatedCode.match(functionBodyMatch)![1];
        const functionBodyIdentifierName2: string = obfuscatedCode.match(functionBodyMatch)![2];

        it('should keep same names for identifiers in function parameter array pattern and function body', () => {
            assert.equal(arrayPatternIdentifierName1, functionBodyIdentifierName1);
            assert.equal(arrayPatternIdentifierName2, functionBodyIdentifierName2);
        });
    });
});
