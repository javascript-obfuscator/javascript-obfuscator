import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';

describe('FunctionTransformer', () => {
    describe('identifiers transformation inside `FunctionDeclaration` and `FunctionExpression` node body', () => {
        const functionParamIdentifierRegExp: RegExp = /var _0x[a-f0-9]{4,6} *= *function *\((_0x[a-f0-9]{4,6})\) *\{/;
        const functionBodyIdentifierRegExp: RegExp = /console\['log'\]\((_0x[a-f0-9]{4,6})\)/;
        const variableRegExp: RegExp = /variable *= *0x6;/;

        let obfuscatedCode: string,
            functionParamIdentifierName: string,
            functionBodyIdentifierName: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();

            const functionParamIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(functionParamIdentifierRegExp);
            const functionBodyIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(functionBodyIdentifierRegExp);

            functionParamIdentifierName = (<RegExpMatchArray>functionParamIdentifierMatch)[1];
            functionBodyIdentifierName = (<RegExpMatchArray>functionBodyIdentifierMatch)[1];
        });

        it('should correctly transform both function parameter identifier and function body identifier with same name', () => {
            assert.equal(functionParamIdentifierName, functionBodyIdentifierName);
        });

        it('shouldn\'t transform other variables in function body', () => {
            assert.match(obfuscatedCode, variableRegExp);
        });
    });

    describe('object pattern as parameter', () => {
        const functionParameterRegExp: RegExp = /function *\(\{ *bar *\}\) *\{/;
        const functionBodyRegExp: RegExp = /return *bar;/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-pattern-as-parameter.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('match #1: shouldn\'t transform function parameter object pattern identifier', () => {
            assert.match(obfuscatedCode, functionParameterRegExp);
        });

        it('match #2: shouldn\'t transform function parameter object pattern identifier', () => {
            assert.match(obfuscatedCode, functionBodyRegExp);
        });
    });

    describe('assignment pattern as parameter', () => {
        describe('variant #1: literal as right value', () => {
            const functionParameterRegExp: RegExp = /function *\(_0x[a-f0-9]{4,6} *= *0x1\) *\{/;
            const functionBodyRegExp: RegExp = /return *_0x[a-f0-9]{4,6};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/assignment-pattern-as-parameter-1.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('match #1: should transform function parameter assignment pattern identifier', () => {
                assert.match(obfuscatedCode, functionParameterRegExp);
            });

            it('match #2: should transform function parameter assignment pattern identifier', () => {
                assert.match(obfuscatedCode, functionBodyRegExp);
            });
        });

        describe('variant #2: identifier as right value', () => {
            const variableDeclarationRegExp: RegExp = /var *(_0x[a-f0-9]{4,6}) *= *0x1;/;
            const functionParameterRegExp: RegExp = /function *\((_0x[a-f0-9]{4,6}) *= *(_0x[a-f0-9]{4,6})\) *\{/;
            const functionBodyRegExp: RegExp = /return *(_0x[a-f0-9]{4,6});/;

            let obfuscatedCode: string,
                variableDeclarationIdentifierName: string,
                functionParameterIdentifierName: string,
                functionDefaultParameterIdentifierName: string,
                functionBodyIdentifierName: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/assignment-pattern-as-parameter-2.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
                variableDeclarationIdentifierName = getRegExpMatch(obfuscatedCode, variableDeclarationRegExp);
                functionParameterIdentifierName = getRegExpMatch(obfuscatedCode, functionParameterRegExp);
                functionDefaultParameterIdentifierName = getRegExpMatch(obfuscatedCode, functionParameterRegExp, 1);
                functionBodyIdentifierName = getRegExpMatch(obfuscatedCode, functionBodyRegExp);
            });

            it('match #1: should transform function parameter assignment pattern identifier', () => {
                assert.match(obfuscatedCode, variableDeclarationRegExp);
            });

            it('match #2: should transform function parameter assignment pattern identifier', () => {
                assert.match(obfuscatedCode, functionParameterRegExp);
            });

            it('match #3: should transform function parameter assignment pattern identifier', () => {
                assert.match(obfuscatedCode, functionBodyRegExp);
            });

            it('should keep same names for identifier in variable declaration and default value identifier of function parameter', () => {
                assert.equal(variableDeclarationIdentifierName, functionDefaultParameterIdentifierName);
            });

            it('should keep same names for identifiers in function params and function body', () => {
                assert.equal(functionParameterIdentifierName, functionBodyIdentifierName);
            });
        });

        describe('variant #3: identifier as right value', () => {
            const variableDeclarationRegExp: RegExp = /var *(_0x[a-f0-9]{4,6}) *= *0x1;/;
            const functionParameterRegExp: RegExp = /function *\((_0x[a-f0-9]{4,6}), *(_0x[a-f0-9]{4,6}) *= *(_0x[a-f0-9]{4,6})\) *\{/;
            const functionBodyRegExp: RegExp = /return *(_0x[a-f0-9]{4,6}) *\+ *(_0x[a-f0-9]{4,6});/;

            let obfuscatedCode: string,
                variableDeclarationIdentifierName: string,
                functionParameterIdentifierName: string,
                functionDefaultParameterIdentifierName1: string,
                functionDefaultParameterIdentifierName2: string,
                functionBodyIdentifierName1: string,
                functionBodyIdentifierName2: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/assignment-pattern-as-parameter-3.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();

                variableDeclarationIdentifierName = getRegExpMatch(obfuscatedCode, variableDeclarationRegExp);
                functionParameterIdentifierName = getRegExpMatch(obfuscatedCode, functionParameterRegExp);
                functionDefaultParameterIdentifierName1 = getRegExpMatch(obfuscatedCode, functionParameterRegExp, 1);
                functionDefaultParameterIdentifierName2 = getRegExpMatch(obfuscatedCode, functionParameterRegExp, 2);

                functionBodyIdentifierName1 = getRegExpMatch(obfuscatedCode, functionBodyRegExp);
                functionBodyIdentifierName2 = getRegExpMatch(obfuscatedCode, functionBodyRegExp, 1);
            });

            it('match #1: should transform function parameter assignment pattern identifier', () => {
                assert.match(obfuscatedCode, variableDeclarationRegExp);
            });

            it('match #2: should transform function parameter assignment pattern identifier', () => {
                assert.match(obfuscatedCode, functionParameterRegExp);
            });

            it('match #3: should transform function parameter assignment pattern identifier', () => {
                assert.match(obfuscatedCode, functionBodyRegExp);
            });

            it('equal #1: shouldn\'t keep same names variable declaration identifier and function parameters identifiers', () => {
                assert.notEqual(variableDeclarationIdentifierName, functionParameterIdentifierName);
            });

            it('equal #2: shouldn\'t keep same names variable declaration identifier and function parameters identifiers', () => {
                assert.notEqual(variableDeclarationIdentifierName, functionDefaultParameterIdentifierName1);
            });

            it('equal #3: shouldn\'t keep same names variable declaration identifier and function parameters identifiers', () => {
                assert.notEqual(variableDeclarationIdentifierName, functionDefaultParameterIdentifierName2);
            });

            it('should keep same names for identifier in first function parameter and default value identifier of second function parameter', () => {
                assert.equal(functionParameterIdentifierName, functionDefaultParameterIdentifierName2);
            });

            it('equal #1: should keep same names for identifiers in function params and function body', () => {
                assert.equal(functionParameterIdentifierName, functionBodyIdentifierName1);
            });

            it('equal #2: should keep same names for identifiers in function params and function body', () => {
                assert.equal(functionDefaultParameterIdentifierName1, functionBodyIdentifierName2);
            });
        });
    });

    describe('array pattern as parameter', () => {
        const functionParameterRegExp: RegExp = /function *\(\[(_0x[a-f0-9]{4,6}), *(_0x[a-f0-9]{4,6})\]\) *\{/;
        const functionBodyRegExp: RegExp = /return *(_0x[a-f0-9]{4,6}) *\+ *(_0x[a-f0-9]{4,6});/;

        let arrayPatternIdentifierName1: string,
            arrayPatternIdentifierName2: string,
            functionBodyIdentifierName1: string,
            functionBodyIdentifierName2: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/array-pattern-as-parameter.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            arrayPatternIdentifierName1 = getRegExpMatch(obfuscatedCode, functionParameterRegExp);
            arrayPatternIdentifierName2 = getRegExpMatch(obfuscatedCode, functionParameterRegExp, 1);
            functionBodyIdentifierName1 = getRegExpMatch(obfuscatedCode, functionBodyRegExp);
            functionBodyIdentifierName2 = getRegExpMatch(obfuscatedCode, functionBodyRegExp, 1);
        });

        it('equal #1: should keep same names for identifiers in function parameter array pattern and function body', () => {
            assert.equal(arrayPatternIdentifierName1, functionBodyIdentifierName1);
        });

        it('equal #2: should keep same names for identifiers in function parameter array pattern and function body', () => {
            assert.equal(arrayPatternIdentifierName2, functionBodyIdentifierName2);
        });
    });
});
