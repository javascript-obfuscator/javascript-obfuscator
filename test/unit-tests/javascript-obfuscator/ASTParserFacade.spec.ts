import { assert } from 'chai';

import { ecmaVersion } from '../../../src/constants/EcmaVersion';

import { ASTParserFacade } from '../../../src/ASTParserFacade';

describe('ASTParserFacade', () => {
    describe(`parse`, () => {
        describe(`\`Unexpected token\` error code preview`, () => {
            describe('Variant #1: 5 lines of code', () => {
                const sourceCode: string = `` +
                `var foo = 1;
                var bar = 2;
                var baz = 3;,
                var bark = 4;
                var hawk = 5;`;

                let testFunc: () => void;

                before(() => {
                    testFunc = () => ASTParserFacade.parse(sourceCode, { ecmaVersion });
                });

                it('should output code preview when AST parser throws a parse error', () => {
                    assert.throws(testFunc, /ERROR at line 3: Unexpected token \(3:28\)\n.*\.\.\.var baz = 3;,\.\.\./);
                });
            });

            describe('Variant #2: 15 lines of code', () => {
                const sourceCode: string = `` +
                `var var1 = 1;
                var var2 = 2;
                var var3 = 3;
                var var4 = 4;
                var var5 = 5;
                var var6 = 6;
                var var7 = 7;
                var var8 = 8;
                var var9 = 9;
                var var10 = 10;
                var foo = 1;
                var bar = 2;
                var baz = 3;,
                var bark = 4;
                var hawk = 5;`;

                let testFunc: () => void;

                before(() => {
                    testFunc = () => ASTParserFacade.parse(sourceCode, { ecmaVersion });
                });

                it('should output code preview when AST parser throws a parse error', () => {
                    assert.throws(testFunc, /ERROR at line 13: Unexpected token \(13:28\)\n.*\.\.\.var baz = 3;,\.\.\./);
                });
            });

            describe('Variant #3: code with functions', () => {
                const sourceCode: string = `` +
                    `function bar () {
                        var a = 1;
                    }
                    functin baz () {
                        var a = 1;
                    }
                    function bark () {
                        var a = 1;
                    }`;

                let testFunc: () => void;

                before(() => {
                    testFunc = () => ASTParserFacade.parse(sourceCode, { ecmaVersion });
                });

                it('should output code preview when AST parser throws a parse error', () => {
                    assert.throws(testFunc, /ERROR at line 4: Unexpected token \(4:28\)\n.*\.\.\.functin baz \(\) {\.\.\./);
                });
            });
        });
    });
});
