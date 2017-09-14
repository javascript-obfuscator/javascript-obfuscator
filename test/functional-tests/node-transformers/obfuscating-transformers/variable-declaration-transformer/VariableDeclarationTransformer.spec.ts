import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('VariableDeclarationTransformer', () => {
    describe('variant #1: default behaviour', () => {
        const variableDeclarationRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *'abc';/;
        const variableCallRegExp: RegExp = /console\['log'\]\(_0x([a-f0-9]){4,6}\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-declaration.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('match #1: should transform `variableDeclaration` node', () => {
            assert.match(obfuscatedCode, variableDeclarationRegExp);
        });

        it('match #2: should transform `variableDeclaration` node', () => {
            assert.match(obfuscatedCode, variableCallRegExp);
        });
    });

    describe('variant #2: parent block scope node is `Program` node', () => {
        describe('variant #1: `renameGlobals` option is disabled', () => {
            const variableDeclarationRegExp: RegExp = /var *test *= *0xa;/;
            const variableCallRegExp: RegExp = /console\['log'\]\(test\);/;

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

            it('match #1: shouldn\'t transform `variableDeclaration` node', () => {
                assert.match(obfuscatedCode, variableDeclarationRegExp);
            });

            it('match #2: shouldn\'t transform `variableDeclaration` node', () => {
                assert.match(obfuscatedCode, variableCallRegExp);
            });
        });

        describe('variant #2: `renameGlobals` option is enabled', () => {
            const variableDeclarationRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *0xa;/;
            const variableCallRegExp: RegExp = /console\['log'\]\(_0x([a-f0-9]){4,6}\);/;

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

            it('match #1: should transform `variableDeclaration` node', () => {
                assert.match(obfuscatedCode, variableDeclarationRegExp);
            });

            it('match #2: should transform `variableDeclaration` node', () => {
                assert.match(obfuscatedCode, variableCallRegExp);
            });
        });
    });

    describe('variant #3: scope of `var` kind', () => {
        const regExp: RegExp = /console\['log'\]\(_0x([a-f0-9]){4,6}\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/var-kind.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should transform variable call (`identifier` node) outside of block scope of node in which this variable was declared with `var` kind', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('variant #4: scope of `let` kind', () => {
        const regExp: RegExp = /console\['log'\]\(test\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/let-kind.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('shouldn\'t transform variable call (`identifier` node) outside of block scope of node in which this variable was declared with `let` kind', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe(`variant #5: variable calls before variable declaration`, () => {
        const functionBodyVariableCallRegExp: RegExp = /console\['log'\]\(_0x([a-f0-9]){4,6}\['item'\]\);/;
        const variableCallBeforeDeclarationRegExp: RegExp = /console\['log'\]\(_0x([a-f0-9]){4,6}\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/variable-call-before-variable-declaration-1.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should transform variable call (`identifier` node name) before variable declaration if this call is inside function body', () => {
            assert.match(obfuscatedCode, functionBodyVariableCallRegExp);
        });

        it('should transform variable call (`identifier` node name) before variable declaration', () => {
            assert.match(obfuscatedCode, variableCallBeforeDeclarationRegExp);
        });
    });

    describe(`variant #6: variable calls before variable declaration when function param has the same name as variables name`, () => {
        const functionParamIdentifierRegExp: RegExp = /function *_0x[a-f0-9]{4,6} *\((_0x[a-f0-9]{4,6})\,(_0x[a-f0-9]{4,6})\) *\{/;
        const innerFunctionParamIdentifierRegExp: RegExp = /function _0x[a-f0-9]{4,6} *\((_0x[a-f0-9]{4,6})\) *\{/;
        const constructorIdentifierRegExp: RegExp = /console\['log'\]\((_0x[a-f0-9]{4,6})\)/;
        const objectIdentifierRegExp: RegExp = /return\{'t':(_0x[a-f0-9]{4,6})\}/;
        const variableDeclarationIdentifierRegExp: RegExp = /var *(_0x[a-f0-9]{4,6});/;

        let outerFunctionParamIdentifierName: string|null,
            innerFunctionParamIdentifierName: string|null,
            constructorIdentifierName: string|null,
            objectIdentifierName: string|null,
            variableDeclarationIdentifierName: string|null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/variable-call-before-variable-declaration-2.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            outerFunctionParamIdentifierName = getRegExpMatch(obfuscatedCode, functionParamIdentifierRegExp);
            innerFunctionParamIdentifierName = getRegExpMatch(obfuscatedCode, innerFunctionParamIdentifierRegExp);
            constructorIdentifierName = getRegExpMatch(obfuscatedCode, constructorIdentifierRegExp);
            objectIdentifierName = getRegExpMatch(obfuscatedCode, objectIdentifierRegExp);
            variableDeclarationIdentifierName = getRegExpMatch(obfuscatedCode, variableDeclarationIdentifierRegExp);
        });

        it('match #1: should\'t name variables inside inner function with names from outer function params', () => {
            assert.notEqual(outerFunctionParamIdentifierName, constructorIdentifierName);
        });

        it('match #2: should\'t name variables inside inner function with names from outer function params', () => {
            assert.notEqual(outerFunctionParamIdentifierName, innerFunctionParamIdentifierName);
        });

        it('match #1: should correct transform variables inside outer function body', () => {
            assert.equal(outerFunctionParamIdentifierName, objectIdentifierName);
        });

        it('match #2: should correct transform variables inside outer function body', () => {
            assert.equal(outerFunctionParamIdentifierName, variableDeclarationIdentifierName);
        });

        it('should correct transform variables inside inner function body', () => {
            assert.equal(innerFunctionParamIdentifierName, constructorIdentifierName);
        });

        it('should keep equal names after transformation for variables with same names', () => {
            assert.equal(variableDeclarationIdentifierName, objectIdentifierName);
        });
    });

    describe(`variant #7: variable calls before variable declaration when catch clause param has the same name as variables name`, () => {
        const catchClauseParamIdentifierRegExp: RegExp = /catch *\((_0x[a-f0-9]{4,6})\) *\{/;
        const innerFunctionParamIdentifierRegExp: RegExp = /function _0x[a-f0-9]{4,6} *\((_0x[a-f0-9]{4,6})\) *\{/;
        const constructorIdentifierRegExp: RegExp = /console\['log'\]\((_0x[a-f0-9]{4,6})\)/;
        const objectIdentifierRegExp: RegExp = /return\{'t':(_0x[a-f0-9]{4,6})\}/;
        const variableDeclarationIdentifierRegExp: RegExp = /var *(_0x[a-f0-9]{4,6});/;

        let catchClauseParamIdentifierName: string|null,
            innerFunctionParamIdentifierName: string|null,
            constructorIdentifierName: string|null,
            objectIdentifierName: string|null,
            variableDeclarationIdentifierName: string|null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/variable-call-before-variable-declaration-3.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            catchClauseParamIdentifierName = getRegExpMatch(obfuscatedCode, catchClauseParamIdentifierRegExp);
            innerFunctionParamIdentifierName = getRegExpMatch(obfuscatedCode, innerFunctionParamIdentifierRegExp);
            constructorIdentifierName = getRegExpMatch(obfuscatedCode, constructorIdentifierRegExp);
            objectIdentifierName = getRegExpMatch(obfuscatedCode, objectIdentifierRegExp);
            variableDeclarationIdentifierName = getRegExpMatch(obfuscatedCode, variableDeclarationIdentifierRegExp);
        });

        it('match #1: should\'t name variables inside inner function with names from catch clause param', () => {
            assert.notEqual(catchClauseParamIdentifierName, constructorIdentifierName);
        });

        it('match #2: should\'t name variables inside inner function with names from catch clause param', () => {
            assert.notEqual(catchClauseParamIdentifierName, innerFunctionParamIdentifierName);
        });

        it('equal #1: should correct transform variables inside catch clause body', () => {
            assert.equal(catchClauseParamIdentifierName, objectIdentifierName);
        });

        it('equal #2: should correct transform variables inside catch clause body', () => {
            assert.equal(catchClauseParamIdentifierName, variableDeclarationIdentifierName);
        });

        it('should correct transform variables inside inner function body', () => {
            assert.equal(innerFunctionParamIdentifierName, constructorIdentifierName);
        });

        it('should keep equal names after transformation for variables with same names', () => {
            assert.equal(variableDeclarationIdentifierName, objectIdentifierName);
        });
    });

    describe('variant #8: wrong replacement', () => {
        describe('variant #1: property node identifier', () => {
            const regExp: RegExp = /var _0x([a-f0-9]){4,6} *= *\{'test/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/property-identifier.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('shouldn\'t replace property node identifier', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('variant #2: computed member expression identifier', () => {
            const regExp: RegExp = /_0x([a-f0-9]){4,6}\['test'\]/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/member-expression-identifier.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('shouldn\'t replace computed member expression identifier', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });

    describe('variant #9: object pattern as variable declarator', () => {
        const objectPatternVariableDeclaratorRegExp: RegExp = /var *\{ *bar *\} *= *\{ *'bar' *: *'foo' *\};/;
        const variableUsageRegExp: RegExp = /console\['log'\]\(bar\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-pattern.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('match #1: shouldn\'t transform object pattern variable declarator', () => {
            assert.match(obfuscatedCode, objectPatternVariableDeclaratorRegExp);
        });

        it('match #2: shouldn\'t transform object pattern variable declarator', () => {
            assert.match(obfuscatedCode, variableUsageRegExp);
        });
    });

    describe('variant #10: array pattern as variable declarator', () => {
        const objectPatternVariableDeclaratorRegExp: RegExp = /var *\[ *(_0x([a-f0-9]){4,6}), *(_0x([a-f0-9]){4,6}) *\] *= *\[0x1, *0x2\];/;
        const variableUsageRegExp: RegExp = /console\['log'\]\((_0x([a-f0-9]){4,6}), *(_0x([a-f0-9]){4,6})\);/;

        let obfuscatedCode: string,
            objectPatternIdentifierName1: string,
            objectPatternIdentifierName2: string,
            identifierName1: string,
            identifierName2: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/array-pattern.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();

            objectPatternIdentifierName1 = getRegExpMatch(obfuscatedCode, objectPatternVariableDeclaratorRegExp);
            objectPatternIdentifierName2 = getRegExpMatch(obfuscatedCode, objectPatternVariableDeclaratorRegExp, 1);
            identifierName1 = getRegExpMatch(obfuscatedCode, variableUsageRegExp);
            identifierName2 = getRegExpMatch(obfuscatedCode, variableUsageRegExp, 1);
        });

        it('match #1: should transform array pattern variable declarator', () => {
            assert.match(obfuscatedCode, objectPatternVariableDeclaratorRegExp);
        });

        it('match #2: should transform array pattern variable declarator', () => {
            assert.match(obfuscatedCode, variableUsageRegExp);
        });

        it('equal #1: should keep same identifier names same for identifiers in variable declaration and after variable declaration', () => {
            assert.equal(objectPatternIdentifierName1, identifierName1);
        });

        it('equal #2: should keep same identifier names same for identifiers in variable declaration and after variable declaration', () => {
            assert.equal(objectPatternIdentifierName2, identifierName2);
        });
    });
});
