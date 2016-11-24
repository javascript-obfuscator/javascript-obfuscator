import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('VariableDeclarationObfuscator', () => {
    it('should obfuscate `variableDeclaration` node', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `
                function foo () {
                    var test = 'abc';
                    console.log(test);
                }
            `,
            Object.assign({}, NO_CUSTOM_NODES_PRESET)
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /var *_0x([a-z0-9]){4,6} *= *'\\x61\\x62\\x63';/);
        assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(_0x([a-z0-9]){4,6}\);/);
    });

    it('should not obfuscate `variableDeclaration` node if parent block scope node is `Program` node', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `
                if (true) {
                    var test = 10;
                }
        
                console.log(test);
            `,
            Object.assign({}, NO_CUSTOM_NODES_PRESET)
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *0xa;/);
        assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(test\);/);
    });

    it('should obfuscate variable call (`identifier` node) outside of block scope of node in which this variable was declared with `var` kind', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `
                (function () {
                    if (true) {
                        var test = 10;
                    }
            
                    console.log(test);
                })();
            `,
            Object.assign({}, NO_CUSTOM_NODES_PRESET)
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(_0x([a-z0-9]){4,6}\);/);
    });

    it('should not obfuscate variable call (`identifier` node) outside of block scope of node in which this variable was declared with `let` kind', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `
                (function () {
                    if (true) {
                        let test = 10;
                    }
                    
                    console.log(test);
                })();
            `,
            Object.assign({}, NO_CUSTOM_NODES_PRESET)
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(test\);/);
    });

    describe(`variable calls before variable declaration`, () => {
        let obfuscationResult: IObfuscationResult;

        beforeEach(() => {
            obfuscationResult = JavaScriptObfuscator.obfuscate(
                `
                    function foo () {
                        function bar () {
                          console.log(abc.item);
                        }
                        
                        console.log(abc);
                        
                        var abc = {};
                        
                        abc.item = 15;
                        bar();
                    }
                `,
                Object.assign({}, NO_CUSTOM_NODES_PRESET)
            );
        });

        it('should obfuscate variable call (`identifier` node) before variable declaration if this call is inside function body', () => {
            assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(_0x([a-z0-9]){4,6}\['\\x69\\x74\\x65\\x6d'\]\);/);
        });

        it('should not obfuscate variable call (`identifier` node) before variable declaration', () => {
            assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(_0x([a-z0-9]){4,6}\);/);
        });
    });

    describe(`variable calls before variable declaration when function param has the same name as variables name`, () => {
        let obfuscationResult: IObfuscationResult,
            functionParamIdentifierName: string|null,
            innerFunctionParamIdentifierName: string|null,
            constructorIdentifierName: string|null,
            objectIdentifierName: string|null,
            variableDeclarationIdentifierName: string|null;

        beforeEach(() => {
            obfuscationResult = JavaScriptObfuscator.obfuscate(
                `
                    (function () {
                        function foo (t, e) {
                            return function () {
                                function baz (t) {
                                    console.log(t);
                                }
                        
                                return {t: t};
                                var t;
                            }();
                        }
                    })();
                `,
                Object.assign({}, NO_CUSTOM_NODES_PRESET)
            );
        });

        it('should correct obfuscate variables inside function body', () => {
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
            const functionParamIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/function *_0x[a-z0-9]{4,6} *\((_0x[a-z0-9]{4,6})\,(_0x[a-z0-9]{4,6})\) *\{/);
            const innerFunctionParamIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/function _0x[a-z0-9]{4,6} *\((_0x[a-z0-9]{4,6})\) *\{/);
            const constructorIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/console\['\\x6c\\x6f\\x67'\]\((_0x[a-z0-9]{4,6})\)/);
            const objectIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/return\{'\\x74':(_0x[a-z0-9]{4,6})\}/);
            const variableDeclarationIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/var *(_0x[a-z0-9]{4,6});/);

            functionParamIdentifierName = (<RegExpMatchArray>functionParamIdentifierMatch)[1];
            innerFunctionParamIdentifierName = (<RegExpMatchArray>innerFunctionParamIdentifierMatch)[1];
            constructorIdentifierName = (<RegExpMatchArray>constructorIdentifierMatch)[1];
            objectIdentifierName = (<RegExpMatchArray>objectIdentifierMatch)[1];
            variableDeclarationIdentifierName = (<RegExpMatchArray>variableDeclarationIdentifierMatch)[1];

            assert.notEqual(functionParamIdentifierName, constructorIdentifierName);
            assert.notEqual(functionParamIdentifierName, innerFunctionParamIdentifierName);

            assert.equal(functionParamIdentifierName, objectIdentifierName);
            assert.equal(functionParamIdentifierName, variableDeclarationIdentifierName);

            assert.equal(innerFunctionParamIdentifierName, constructorIdentifierName);
            assert.equal(variableDeclarationIdentifierName, objectIdentifierName);
        });
    });

    describe('wrong replacement', () => {
        it('shouldn\'t replace property node identifier', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `
                function foo () {
                    var test = 'abc';
                    
                    var object = {
                        test: 'cde'
                    };
                    
                    console.log(test);
                }
            `,
                Object.assign({}, NO_CUSTOM_NODES_PRESET)
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var _0x([a-z0-9]){4,6} *= *\{'\\x74\\x65\\x73\\x74/);
        });

        it('shouldn\'t replace computed member expression identifier', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `
                function foo () {
                    var test = 'abc';
                    
                    var object = {
                        'test': 'cde'
                    };
                    
                    console.log(test);
                    console.log(object.test);
                }
            `,
                Object.assign({}, NO_CUSTOM_NODES_PRESET)
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /_0x([a-z0-9]){4,6}\['\\x74\\x65\\x73\\x74'\]/);
        });
    });
});
