import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('VariableDeclarationTransformer', () => {
    describe('Variant #1: default behaviour', () => {
        const variableDeclarationRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *'abc';/;
        const variableCallRegExp: RegExp = /console\['log'\]\(_0x([a-f0-9]){4,6}\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-declaration.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('match #1: should transform `variableDeclaration` node', () => {
            assert.match(obfuscatedCode, variableDeclarationRegExp);
        });

        it('match #2: should transform `variableDeclaration` node', () => {
            assert.match(obfuscatedCode, variableCallRegExp);
        });
    });

    describe('Variant #2: parent block scope node is `Program` node', () => {
        describe('Variant #1: `renameGlobals` option is disabled', () => {
            const variableDeclarationRegExp: RegExp = /var *test *= *0xa;/;
            const variableCallRegExp: RegExp = /console\['log'\]\(test\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/parent-block-scope-is-program-node.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('match #1: shouldn\'t transform `variableDeclaration` node', () => {
                assert.match(obfuscatedCode, variableDeclarationRegExp);
            });

            it('match #2: shouldn\'t transform `variableDeclaration` node', () => {
                assert.match(obfuscatedCode, variableCallRegExp);
            });
        });

        describe('Variant #2: `renameGlobals` option is enabled', () => {
            const variableDeclarationRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *0xa;/;
            const variableCallRegExp: RegExp = /console\['log'\]\(_0x([a-f0-9]){4,6}\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/parent-block-scope-is-program-node.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should transform `variableDeclaration` node', () => {
                assert.match(obfuscatedCode, variableDeclarationRegExp);
            });

            it('match #2: should transform `variableDeclaration` node', () => {
                assert.match(obfuscatedCode, variableCallRegExp);
            });
        });
    });

    describe('Variant #3: scope of `var` kind', () => {
        const regExp: RegExp = /console\['log'\]\(_0x([a-f0-9]){4,6}\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/var-kind.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('should transform variable call (`identifier` node) outside of block scope of node in which this variable was declared with `var` kind', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #4: scope of `let` kind', () => {
        const regExp: RegExp = /console\['log'\]\(test\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/let-kind.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('shouldn\'t transform variable call (`identifier` node) outside of block scope of node in which this variable was declared with `let` kind', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe(`Variant #5: variable calls before variable declaration`, () => {
        const functionBodyVariableCallRegExp: RegExp = /console\['log'\]\(_0x([a-f0-9]){4,6}\['item'\]\);/;
        const variableCallBeforeDeclarationRegExp: RegExp = /console\['log'\]\(_0x([a-f0-9]){4,6}\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/variable-call-before-variable-declaration-1.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('should transform variable call (`identifier` node name) before variable declaration if this call is inside function body', () => {
            assert.match(obfuscatedCode, functionBodyVariableCallRegExp);
        });

        it('should transform variable call (`identifier` node name) before variable declaration', () => {
            assert.match(obfuscatedCode, variableCallBeforeDeclarationRegExp);
        });
    });

    describe(`Variant #6: variable calls before variable declaration when function param has the same name as variables name`, () => {
        const functionParamIdentifierRegExp: RegExp = /function *_0x[a-f0-9]{4,6} *\((_0x[a-f0-9]{4,6})\,(_0x[a-f0-9]{4,6})\) *\{/;
        const innerFunctionParamIdentifierRegExp: RegExp = /function _0x[a-f0-9]{4,6} *\((_0x[a-f0-9]{4,6})\) *\{/;
        const consoleLogIdentifierRegExp: RegExp = /console\['log'\]\((_0x[a-f0-9]{4,6})\)/;
        const objectIdentifierRegExp: RegExp = /return\{'t':(_0x[a-f0-9]{4,6})\}/;
        const variableDeclarationIdentifierRegExp: RegExp = /var *(_0x[a-f0-9]{4,6});/;

        let outerFunctionParamIdentifierName: string|null,
            innerFunctionParamIdentifierName: string|null,
            consoleLogIdentifierName: string|null,
            objectIdentifierName: string|null,
            variableDeclarationIdentifierName: string|null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/variable-call-before-variable-declaration-2.js');

            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();

            outerFunctionParamIdentifierName = getRegExpMatch(obfuscatedCode, functionParamIdentifierRegExp);
            innerFunctionParamIdentifierName = getRegExpMatch(obfuscatedCode, innerFunctionParamIdentifierRegExp);
            consoleLogIdentifierName = getRegExpMatch(obfuscatedCode, consoleLogIdentifierRegExp);
            objectIdentifierName = getRegExpMatch(obfuscatedCode, objectIdentifierRegExp);
            variableDeclarationIdentifierName = getRegExpMatch(obfuscatedCode, variableDeclarationIdentifierRegExp);
        });

        it('equal #1: should generate same names for identifiers inside inner function and outer function params', () => {
            assert.equal(outerFunctionParamIdentifierName, consoleLogIdentifierName);
        });

        it('equal #2: should generate same names for identifiers inside inner function and inner function params', () => {
            assert.equal(outerFunctionParamIdentifierName, innerFunctionParamIdentifierName);
        });

        it('equal #1: should correct transform variables inside outer function body', () => {
            assert.equal(outerFunctionParamIdentifierName, objectIdentifierName);
        });

        it('equal #2: should correct transform variables inside outer function body', () => {
            assert.equal(outerFunctionParamIdentifierName, variableDeclarationIdentifierName);
        });

        it('should correct transform variables inside inner function body', () => {
            assert.equal(innerFunctionParamIdentifierName, consoleLogIdentifierName);
        });

        it('should keep equal names after transformation for variables with same names', () => {
            assert.equal(variableDeclarationIdentifierName, objectIdentifierName);
        });
    });

    describe(`Variant #7: variable calls before variable declaration when catch clause param has the same name as variables name`, () => {
        const catchClauseParamIdentifierRegExp: RegExp = /catch *\((_0x[a-f0-9]{4,6})\) *\{/;
        const innerFunctionParamIdentifierRegExp: RegExp = /function _0x[a-f0-9]{4,6} *\((_0x[a-f0-9]{4,6})\) *\{/;
        const consoleLogIdentifierRegExp: RegExp = /console\['log'\]\((_0x[a-f0-9]{4,6})\)/;
        const objectIdentifierRegExp: RegExp = /return\{'t':(_0x[a-f0-9]{4,6})\}/;
        const variableDeclarationIdentifierRegExp: RegExp = /var *(_0x[a-f0-9]{4,6});/;

        let catchClauseParamIdentifierName: string|null,
            innerFunctionParamIdentifierName: string|null,
            consoleLogIdentifierName: string|null,
            objectIdentifierName: string|null,
            variableDeclarationIdentifierName: string|null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/variable-call-before-variable-declaration-3.js');

            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();

            catchClauseParamIdentifierName = getRegExpMatch(obfuscatedCode, catchClauseParamIdentifierRegExp);
            innerFunctionParamIdentifierName = getRegExpMatch(obfuscatedCode, innerFunctionParamIdentifierRegExp);
            consoleLogIdentifierName = getRegExpMatch(obfuscatedCode, consoleLogIdentifierRegExp);
            objectIdentifierName = getRegExpMatch(obfuscatedCode, objectIdentifierRegExp);
            variableDeclarationIdentifierName = getRegExpMatch(obfuscatedCode, variableDeclarationIdentifierRegExp);
        });

        it('match #1: should generate same names for identifiers inside inner function and catch clause param', () => {
            assert.equal(catchClauseParamIdentifierName, consoleLogIdentifierName);
        });

        it('match #2: should generate same names for identifiers inside inner function and catch clause param', () => {
            assert.equal(catchClauseParamIdentifierName, innerFunctionParamIdentifierName);
        });

        it('equal #1: should correct transform variables inside catch clause body', () => {
            assert.equal(catchClauseParamIdentifierName, objectIdentifierName);
        });

        it('equal #2: should correct transform variables inside catch clause body', () => {
            assert.equal(catchClauseParamIdentifierName, variableDeclarationIdentifierName);
        });

        it('should correct transform variables inside inner function body', () => {
            assert.equal(innerFunctionParamIdentifierName, consoleLogIdentifierName);
        });

        it('should keep equal names after transformation for variables with same names', () => {
            assert.equal(variableDeclarationIdentifierName, objectIdentifierName);
        });
    });

    describe('Variant #8: wrong replacement', () => {
        describe('Variant #1: property node identifier', () => {
            const regExp: RegExp = /var _0x([a-f0-9]){4,6} *= *\{'test/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/property-identifier.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t replace property node identifier', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: computed member expression identifier', () => {
            const regExp: RegExp = /_0x([a-f0-9]){4,6}\['test'\]/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/member-expression-identifier.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t replace computed member expression identifier', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });

    describe('Variant #9: object pattern as variable declarator', () => {
        const objectPatternVariableDeclaratorRegExp: RegExp = /var *\{ *bar *\} *= *\{ *'bar' *: *'foo' *\};/;
        const variableUsageRegExp: RegExp = /console\['log'\]\(bar\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-pattern.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('match #1: shouldn\'t transform object pattern variable declarator', () => {
            assert.match(obfuscatedCode, objectPatternVariableDeclaratorRegExp);
        });

        it('match #2: shouldn\'t transform object pattern variable declarator', () => {
            assert.match(obfuscatedCode, variableUsageRegExp);
        });
    });

    describe('Variant #10: array pattern as variable declarator', () => {
        const objectPatternVariableDeclaratorRegExp: RegExp = /var *\[ *(_0x([a-f0-9]){4,6}), *(_0x([a-f0-9]){4,6}) *\] *= *\[0x1, *0x2\];/;
        const variableUsageRegExp: RegExp = /console\['log'\]\((_0x([a-f0-9]){4,6}), *(_0x([a-f0-9]){4,6})\);/;

        let obfuscatedCode: string,
            objectPatternIdentifierName1: string,
            objectPatternIdentifierName2: string,
            identifierName1: string,
            identifierName2: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/array-pattern.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();

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

    describe('Variant #11: computed object expression identifier', () => {
        const computedObjectExpressionRegExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\{\[_0x[a-f0-9]{4,6}\]: *0x1\};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/computed-object-expression-identifier.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('should transform computed object expression identifier', () => {
            assert.match(obfuscatedCode, computedObjectExpressionRegExp);
        });
    });

    describe('Variant #12: method definition key identifier', () => {
        const regExp: RegExp = /\['bar'] *\(\) *{}/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/method-definition-identifier.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('shouldn\'t transform method definition node key identifier', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #13: already renamed identifiers shouldn\'t be renamed twice', () => {
        describe('Variant #1', () => {
            const variableDeclarationRegExp: RegExp = /var *d *= *0x1;/;
            const functionDeclarationRegExp1: RegExp = /function *e *\(\) *{}/;
            const functionDeclarationRegExp2: RegExp = /function *f *\(\) *{}/;
            const functionDeclarationRegExp3: RegExp = /function *g *\(\) *{}/;
            const functionDeclarationRegExp4: RegExp = /function *h *\(\) *{}/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevent-renaming-of-renamed-identifiers-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                    }
                ).getObfuscatedCode();
            });

            it('Match #1: shouldn\'t rename twice variable declaration name', () => {
                assert.match(obfuscatedCode, variableDeclarationRegExp);
            });

            it('Match #2: should correctly rename function declaration name', () => {
                assert.match(obfuscatedCode, functionDeclarationRegExp1);
            });

            it('Match #3: should correctly rename function declaration name', () => {
                assert.match(obfuscatedCode, functionDeclarationRegExp2);
            });

            it('Match #4: should correctly rename function declaration name', () => {
                assert.match(obfuscatedCode, functionDeclarationRegExp3);
            });

            it('Match #5: should correctly rename function declaration name', () => {
                assert.match(obfuscatedCode, functionDeclarationRegExp4);
            });
        });

        describe('Variant #2', () => {
            const variableDeclarationRegExp1: RegExp = /var *d *= *0x1;/;
            const variableDeclarationRegExp2: RegExp = /var *e;/;
            const functionDeclarationRegExp: RegExp = /function *f *\(\) *{/;
            const variableDeclarationRegExp3: RegExp = /var *f *= *function *\(\) *{}/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevent-renaming-of-renamed-identifiers-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                    }
                ).getObfuscatedCode();
            });

            it('Match #1: shouldn\'t rename twice variable declaration name', () => {
                assert.match(obfuscatedCode, variableDeclarationRegExp1);
            });

            it('Match #2: shouldn\'t rename twice variable declaration name', () => {
                assert.match(obfuscatedCode, variableDeclarationRegExp2);
            });

            it('Match #3: should correctly rename function declaration name', () => {
                assert.match(obfuscatedCode, functionDeclarationRegExp);
            });

            it('Match #4: should correctly rename variable declaration name', () => {
                assert.match(obfuscatedCode, variableDeclarationRegExp3);
            });
        });
    });

    describe('Variant #14: named export', () => {
        const namedExportRegExp: RegExp = /export const foo *= *0x1;/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/named-export.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    renameGlobals: true
                }
            ).getObfuscatedCode();
        });

        it('shouldn\'t transform identifiers in named export', () => {
            assert.match(obfuscatedCode, namedExportRegExp);
        });
    });

    describe('Variant #15: default export', () => {
        const variableDeclarationRegExp: RegExp = /var _0x[a-f0-9]{4,6} *= *0x1;/;
        const defaultExportRegExp: RegExp = /export default _0x[a-f0-9]{4,6};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/default-export.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    renameGlobals: true
                }
            ).getObfuscatedCode();
        });

        it('Match #1: should transform identifiers in variable declaration', () => {
            assert.match(obfuscatedCode, variableDeclarationRegExp);
        });

        it('Match #2: should transform identifiers in default export', () => {
            assert.match(obfuscatedCode, defaultExportRegExp);
        });
    });

    describe('Variant #16: array rest', () => {
        const objectRegExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\['foo', *'bar', *'baz'\];/;
        const objectRestRegExp: RegExp = /var *\[_0x[a-f0-9]{4,6}, *\.\.\.*_0x[a-f0-9]{4,6}] *= *_0x[a-f0-9]{4,6};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/array-rest.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('Match #1: should transform object name', () => {
            assert.match(obfuscatedCode, objectRegExp);
        });

        it('Match #2: should transform object rest construction', () => {
            assert.match(obfuscatedCode, objectRestRegExp);
        });
    });

    describe('Variant #17: object rest', () => {
        const objectRegExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\{'foo': *0x1, *'bar': *0x2, *'baz': *0x3\};/;
        const objectRestRegExp: RegExp = /var *\{foo, *\.\.\.*_0x[a-f0-9]{4,6}\} *= *_0x[a-f0-9]{4,6};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-rest.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('Match #1: should transform object name', () => {
            assert.match(obfuscatedCode, objectRegExp);
        });

        it('Match #2: should transform object rest construction', () => {
            assert.match(obfuscatedCode, objectRestRegExp);
        });
    });
});
