import { assert } from 'chai';

import { ecmaVersion } from '../../../src/constants/EcmaVersion';

import { ASTParserFacade } from '../../../src/ASTParserFacade';

describe('ASTParserFacade', () => {
    describe(`parse`, () => {
        describe(`\`Unexpected token\` error code preview`, () => {
            describe('Variant #1: 5 lines of code', () => {
                const sourceCode: string =
                    `` +
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
                const sourceCode: string =
                    `` +
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
                    assert.throws(
                        testFunc,
                        /ERROR at line 13: Unexpected token \(13:28\)\n.*\.\.\.var baz = 3;,\.\.\./
                    );
                });
            });

            describe('Variant #3: code with functions', () => {
                const sourceCode: string =
                    `` +
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
                    assert.throws(
                        testFunc,
                        /ERROR at line 4: Unexpected token \(4:28\)\n.*\.\.\.functin baz \(\) {\.\.\./
                    );
                });
            });
        });

        describe('Import attributes', () => {
            describe('Variant #1: import with "with" syntax', () => {
                const sourceCode: string = `import config from "./config.json" with { type: "json" };`;

                let astTree: any;

                before(() => {
                    astTree = ASTParserFacade.parse(sourceCode, { ecmaVersion });
                });

                it('should parse import with "with" syntax without error', () => {
                    assert.exists(astTree);
                    assert.equal(astTree.type, 'Program');
                    assert.equal(astTree.body[0].type, 'ImportDeclaration');
                });

                it('should preserve import attributes in AST', () => {
                    const importDecl = astTree.body[0];
                    assert.exists(importDecl.attributes);
                    assert.isArray(importDecl.attributes);
                    assert.equal(importDecl.attributes.length, 1);
                    assert.equal(importDecl.attributes[0].key.name, 'type');
                    assert.equal(importDecl.attributes[0].value.value, 'json');
                });
            });

            describe('Variant #2: import with "assert" syntax (deprecated)', () => {
                const sourceCode: string = `import config from "./config.json" assert { type: "json" };`;

                let astTree: any;

                before(() => {
                    astTree = ASTParserFacade.parse(sourceCode, { ecmaVersion });
                });

                it('should parse import with "assert" syntax without error', () => {
                    assert.exists(astTree);
                    assert.equal(astTree.type, 'Program');
                    assert.equal(astTree.body[0].type, 'ImportDeclaration');
                });
            });

            describe('Variant #3: export with "with" syntax', () => {
                const sourceCode: string = `export { default as config } from "./config.json" with { type: "json" };`;

                let astTree: any;

                before(() => {
                    astTree = ASTParserFacade.parse(sourceCode, { ecmaVersion });
                });

                it('should parse export with "with" syntax without error', () => {
                    assert.exists(astTree);
                    assert.equal(astTree.type, 'Program');
                    assert.equal(astTree.body[0].type, 'ExportNamedDeclaration');
                });
            });

            describe('Variant #4: dynamic import with "with" syntax', () => {
                const sourceCode: string = `const config = await import("./config.json", { with: { type: "json" } });`;

                let astTree: any;

                before(() => {
                    astTree = ASTParserFacade.parse(sourceCode, { ecmaVersion });
                });

                it('should parse dynamic import with "with" syntax without error', () => {
                    assert.exists(astTree);
                    assert.equal(astTree.type, 'Program');
                });
            });
        });
    });
});
