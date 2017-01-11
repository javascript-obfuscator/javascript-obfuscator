import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('VariableDeclarationTransformer', () => {
    it('should transform `variableDeclaration` node', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/simple-declaration.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /var *_0x([a-f0-9]){4,6} *= *'\\x61\\x62\\x63';/);
        assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(_0x([a-f0-9]){4,6}\);/);
    });

    it('should not transform `variableDeclaration` node if parent block scope node is `Program` node', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/parent-block-scope-is-program-node.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *0xa;/);
        assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(test\);/);
    });

    it('should transform variable call (`identifier` node) outside of block scope of node in which this variable was declared with `var` kind', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/var-kind.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(_0x([a-f0-9]){4,6}\);/);
    });

    it('should not transform variable call (`identifier` node) outside of block scope of node in which this variable was declared with `let` kind', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/let-kind.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(test\);/);
    });

    describe(`variable calls before variable declaration`, () => {
        let obfuscationResult: IObfuscationResult;

        beforeEach(() => {
            obfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/variable-call-before-variable-declaration-1.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );
        });

        it('should transform variable call (`identifier` node) before variable declaration if this call is inside function body', () => {
            assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(_0x([a-f0-9]){4,6}\['\\x69\\x74\\x65\\x6d'\]\);/);
        });

        it('should not transform variable call (`identifier` node) before variable declaration', () => {
            assert.match(obfuscationResult.getObfuscatedCode(),  /console\['\\x6c\\x6f\\x67'\]\(_0x([a-f0-9]){4,6}\);/);
        });
    });

    describe(`variable calls before variable declaration when function param has the same name as variables name`, () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/variable-call-before-variable-declaration-2.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

        const functionParamIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
            .match(/function *_0x[a-f0-9]{4,6} *\((_0x[a-f0-9]{4,6})\,(_0x[a-f0-9]{4,6})\) *\{/);
        const innerFunctionParamIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
            .match(/function _0x[a-f0-9]{4,6} *\((_0x[a-f0-9]{4,6})\) *\{/);
        const constructorIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
            .match(/console\['\\x6c\\x6f\\x67'\]\((_0x[a-f0-9]{4,6})\)/);
        const objectIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
            .match(/return\{'\\x74':(_0x[a-f0-9]{4,6})\}/);
        const variableDeclarationIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
            .match(/var *(_0x[a-f0-9]{4,6});/);

        const outerFunctionParamIdentifierName: string|null = (<RegExpMatchArray>functionParamIdentifierMatch)[1];
        const innerFunctionParamIdentifierName: string|null = (<RegExpMatchArray>innerFunctionParamIdentifierMatch)[1];
        const constructorIdentifierName: string|null = (<RegExpMatchArray>constructorIdentifierMatch)[1];
        const objectIdentifierName: string|null = (<RegExpMatchArray>objectIdentifierMatch)[1];
        const variableDeclarationIdentifierName: string|null = (<RegExpMatchArray>variableDeclarationIdentifierMatch)[1];

        it('should\'t name variables inside inner function with names from outer function params', () => {
            assert.notEqual(outerFunctionParamIdentifierName, constructorIdentifierName);
            assert.notEqual(outerFunctionParamIdentifierName, innerFunctionParamIdentifierName);
        });

        it('should correct transform variables inside outer function body', () => {
            assert.equal(outerFunctionParamIdentifierName, objectIdentifierName);
            assert.equal(outerFunctionParamIdentifierName, variableDeclarationIdentifierName);
        });

        it('should correct transform variables inside inner function body', () => {
            assert.equal(innerFunctionParamIdentifierName, constructorIdentifierName);
        });

        it('should keep equal names after transformation for variables with same names', () => {
            assert.equal(variableDeclarationIdentifierName, objectIdentifierName);
        });
    });

    describe(`variable calls before variable declaration when catch clause param has the same name as variables name`, () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/variable-call-before-variable-declaration-3.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

        const catchClauseParamIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
            .match(/catch *\((_0x[a-f0-9]{4,6})\) *\{/);
        const innerFunctionParamIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
            .match(/function _0x[a-f0-9]{4,6} *\((_0x[a-f0-9]{4,6})\) *\{/);
        const constructorIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
            .match(/console\['\\x6c\\x6f\\x67'\]\((_0x[a-f0-9]{4,6})\)/);
        const objectIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
            .match(/return\{'\\x74':(_0x[a-f0-9]{4,6})\}/);
        const variableDeclarationIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
            .match(/var *(_0x[a-f0-9]{4,6});/);

        const functionParamIdentifierName: string|null = (<RegExpMatchArray>catchClauseParamIdentifierMatch)[1];
        const innerFunctionParamIdentifierName: string|null = (<RegExpMatchArray>innerFunctionParamIdentifierMatch)[1];
        const constructorIdentifierName: string|null = (<RegExpMatchArray>constructorIdentifierMatch)[1];
        const objectIdentifierName: string|null = (<RegExpMatchArray>objectIdentifierMatch)[1];
        const variableDeclarationIdentifierName: string|null = (<RegExpMatchArray>variableDeclarationIdentifierMatch)[1];

        it('should\'t name variables inside inner function with names from catch clause param', () => {
            assert.notEqual(functionParamIdentifierName, constructorIdentifierName);
            assert.notEqual(functionParamIdentifierName, innerFunctionParamIdentifierName);
        });

        it('should correct transform variables inside catch clause body', () => {
            assert.equal(functionParamIdentifierName, objectIdentifierName);
            assert.equal(functionParamIdentifierName, variableDeclarationIdentifierName);
        });

        it('should correct transform variables inside inner function body', () => {
            assert.equal(innerFunctionParamIdentifierName, constructorIdentifierName);
        });

        it('should keep equal names after transformation for variables with same names', () => {
            assert.equal(variableDeclarationIdentifierName, objectIdentifierName);
        });
    });

    describe('wrong replacement', () => {
        it('shouldn\'t replace property node identifier', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/property-identifier.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var _0x([a-f0-9]){4,6} *= *\{'\\x74\\x65\\x73\\x74/);
        });

        it('shouldn\'t replace computed member expression identifier', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/member-expression-identifier.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /_0x([a-f0-9]){4,6}\['\\x74\\x65\\x73\\x74'\]/);
        });
    });

    describe('object pattern as variable declarator', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/object-pattern.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

        it('shouldn\'t transform object pattern variable declarator', () => {
            const objectPatternVariableDeclarator: RegExp = /var *\{ *bar *\} *= *\{ *'\\x62\\x61\\x72' *: *'\\x66\\x6f\\x6f' *\};/;
            const variableUsageMatch: RegExp = /console\['\\x6c\\x6f\\x67'\]\(bar\);/;

            assert.match(obfuscatedCode, objectPatternVariableDeclarator);
            assert.match(obfuscatedCode, variableUsageMatch);
        });
    });
});
