import { IObfuscationResult } from "../../../src/interfaces/IObfuscationResult";

import { NO_CUSTOM_NODES_PRESET } from "../../../src/preset-options/NoCustomNodesPreset";

import { JavaScriptObfuscator } from "../../../src/JavaScriptObfuscator";

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

        assert.match(obfuscationResult.getObfuscatedCode(),  /var *_0x([a-z0-9]){5,6} *= *'\\x61\\x62\\x63';/);
        assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(_0x([a-z0-9]){5,6}\);/);
    });

    it('should obfuscate variable call (`identifier` node) outside of block scope of node in which this variable was declared with `var` kind', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `
                if (true)
                {
                    var test = 10;
                }
        
                console.log(test);
            `,
            Object.assign({}, NO_CUSTOM_NODES_PRESET)
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(_0x([a-z0-9]){5,6}\);/);
    });

    it('should not obfuscate variable call (`identifier` node) outside of block scope of node in which this variable was declared with `let` kind', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `
                if (true)
                {
                    let test = 10;
                }
        
                console.log(test);
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
            assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(_0x([a-z0-9]){5,6}\['\\x69\\x74\\x65\\x6d'\]\);/);
        });

        it('should not obfuscate variable call (`identifier` node) before variable declaration', () => {
            assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(abc\);/);
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

            assert.match(obfuscationResult.getObfuscatedCode(),  /var _0x([a-z0-9]){5,6} *= *\{'\\x74\\x65\\x73\\x74/);
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

            assert.match(obfuscationResult.getObfuscatedCode(),  /_0x([a-z0-9]){5,6}\['\\x74\\x65\\x73\\x74'\]/);
        });
    });
});
