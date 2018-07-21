import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

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
                    ...NO_ADDITIONAL_NODES_PRESET
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
        describe('Variant #1: simple', () => {
            const functionParameterRegExp: RegExp = /function *\(\{ *bar *\}\) *\{/;
            const functionBodyRegExp: RegExp = /return *bar;/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/object-pattern-as-parameter-1.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
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

        describe('Variant #2: correct transformation when identifier with same name in parent scope exist', () => {
            const functionParameterRegExp: RegExp = /^\(function *\(\) *{ *function *_0x[a-f0-9]{4,6} *\(_0x[a-f0-9]{4,6}\) *\{/;
            const callbackParameterRegExp: RegExp = /\['then'] *\(\({ *data *}\)/;
            const callbackBodyRegExp: RegExp = /console\['log']\(data\)/;
            const returnRegExp: RegExp = /return _0x[a-f0-9]{4,6};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/object-pattern-as-parameter-2.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('match #1: should transform function parameter identifier', () => {
                assert.match(obfuscatedCode, functionParameterRegExp);
            });

            it('match #2: shouldn\'t transform callback parameter object pattern identifier', () => {
                assert.match(obfuscatedCode, callbackParameterRegExp);
            });

            it('match #3: shouldn\'t transform callback body identifier', () => {
                assert.match(obfuscatedCode, callbackBodyRegExp);
            });

            it('match #4: should transform identifier in `ReturnStatement`', () => {
                assert.match(obfuscatedCode, returnRegExp);
            });
        });

        describe('Variant #3: correct transformation when parent scope identifier conflicts with current scope object pattern identifier', () => {
            const functionObjectPatternParameterRegExp: RegExp = /function _0x[a-f0-9]{4,6} *\({data, *\.\.\._0x[a-f0-9]{4,6}}\) *{/;
            const returnRegExp1: RegExp = /return data *\+ *_0x[a-f0-9]{4,6};/;
            const returnRegExp2: RegExp = /return _0x[a-f0-9]{4,6};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/object-pattern-as-parameter-3.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('match #1: should transform function parameter object pattern rest identifier', () => {
                assert.match(obfuscatedCode, functionObjectPatternParameterRegExp);
            });

            it('match #2: should transform identifier in `ReturnStatement` of inner function', () => {
                assert.match(obfuscatedCode, returnRegExp1);
            });

            it('match #2: should transform identifier in `ReturnStatement` of outer function', () => {
                assert.match(obfuscatedCode, returnRegExp2);
            });
        });
    });

    describe('assignment pattern as parameter', () => {
        describe('Variant #1: literal as right value', () => {
            const functionParameterRegExp: RegExp = /function *\(_0x[a-f0-9]{4,6} *= *0x1\) *\{/;
            const functionBodyRegExp: RegExp = /return *_0x[a-f0-9]{4,6};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/assignment-pattern-as-parameter-1.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
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

        describe('Variant #2: identifier as right value', () => {
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
                        ...NO_ADDITIONAL_NODES_PRESET
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

        describe('Variant #3: identifier as right value', () => {
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
                        ...NO_ADDITIONAL_NODES_PRESET
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
                    ...NO_ADDITIONAL_NODES_PRESET
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

    describe('rest parameters', () => {
        const functionRegExp: RegExp = /function *func *\(_0x[a-f0-9]{4,6}, *..._0x[a-f0-9]{4,6}\) *\{/;
        const returnRegExp: RegExp = /return *_0x[a-f0-9]{4,6} *\+ *_0x[a-f0-9]{4,6};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/rest-parameter.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('Match #1: should transform function rest parameter', () => {
            assert.match(obfuscatedCode, functionRegExp);
        });

        it('Match #2: should transform identifiers inside function body', () => {
            assert.match(obfuscatedCode, returnRegExp);
        });
    });

    describe('array rest parameter', () => {
        const functionRegExp: RegExp = /function *func *\(\[_0x[a-f0-9]{4,6}, *..._0x[a-f0-9]{4,6}\]\) *\{/;
        const returnRegExp: RegExp = /return *_0x[a-f0-9]{4,6} *\+ *_0x[a-f0-9]{4,6};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/array-rest-parameter.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('Match #1: should transform function rest parameter', () => {
            assert.match(obfuscatedCode, functionRegExp);
        });

        it('Match #2: should transform identifiers inside function body', () => {
            assert.match(obfuscatedCode, returnRegExp);
        });
    });

    describe('object rest parameter', () => {
        const functionRegExp: RegExp = /function *func *\(\{foo, *..._0x[a-f0-9]{4,6}\}\) *\{/;
        const returnRegExp: RegExp = /return *foo *\+ *_0x[a-f0-9]{4,6};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-rest-parameter.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('Match #1: should transform function rest parameter', () => {
            assert.match(obfuscatedCode, functionRegExp);
        });

        it('Match #2: should transform identifiers inside function body', () => {
            assert.match(obfuscatedCode, returnRegExp);
        });
    });

    describe('ignored identifier names set', () => {
        describe('Variant #1: avoid to add `ObjectPattern` identifier to the set when same identifier exist in function parameter', () => {
            const functionBodyRegExp: RegExp = /\[]\['find']\(\({bar: *_0x[a-f0-9]{4,6}}\) *=> *_0x[a-f0-9]{4,6}\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/identifier-names-set-object-pattern.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should transform identifiers in function body', () => {
                assert.match(obfuscatedCode, functionBodyRegExp);
            });
        });
    });
});
