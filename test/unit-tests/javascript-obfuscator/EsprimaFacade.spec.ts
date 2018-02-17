import { assert } from 'chai';
import { EsprimaFacade } from '../../../src/EsprimaFacade';


describe('EsprimaFacade', () => {
    describe(`parseScript (input: string, config: esprima.ParseOptions): ESTree.Program`, () => {
        describe(`\`Unexpected token\` error code preview`, () => {
            describe('variant #1: 5 lines of code', () => {
                const sourceCode: string = `` +
                `var foo = 1;
                var bar = 2;
                var baz = 3;,
                var bark = 4;
                var hawk = 5;`;

                let testFunc: () => void;

                before(() => {
                    testFunc = () => EsprimaFacade.parseScript(sourceCode, {});
                });

                it('should output code preview when `esprima` throws a parse error', () => {
                    assert.throws(testFunc, /Line 3: Unexpected token ,\n.*\.\.\.var baz = 3;,\.\.\./);
                });
            });

            describe('variant #2: 15 lines of code', () => {
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
                    testFunc = () => EsprimaFacade.parseScript(sourceCode, {});
                });

                it('should output code preview when `esprima` throws a parse error', () => {
                    assert.throws(testFunc, /Line 13: Unexpected token ,\n.*\.\.\.var baz = 3;,\.\.\./);
                });
            });
        });

        describe(`\`Unexpected identifier\` error code preview`, () => {
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
                testFunc = () => EsprimaFacade.parseScript(sourceCode, {});
            });

            it('should output code preview when `esprima` throws a parse error', () => {
                assert.throws(testFunc, /Line 4: Unexpected identifier\n.*\.\.\.functin baz \(\) {\.\.\./);
            });
        });
    });
});
