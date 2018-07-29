import { assert } from 'chai';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

describe('ConditionalCommentObfuscatingGuard', () => {
    describe('check', () => {
        describe('Variant #1: `disable` conditional comment', () => {
            const obfuscatedVariableDeclarationRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *0x1;/;
            const ignoredVariableDeclarationRegExp: RegExp = /var *bar *= *2;/;
            const consoleLogRegExp: RegExp = /console.log\(_0x([a-f0-9]){4,6}\);/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should obfuscate variable declaration before `disable` conditional comment', () => {
                assert.match(obfuscatedCode, obfuscatedVariableDeclarationRegExp);
            });

            it('match #2: should ignore variable declaration after `disable` conditional comment', () => {
                assert.match(obfuscatedCode, ignoredVariableDeclarationRegExp);
            });

            it('match #3: should obfuscate variable name in `console.log`', () => {
                assert.match(obfuscatedCode, consoleLogRegExp);
            });
        });

        describe('Variant #2: `disable` and `enable` conditional comments', () => {
            const obfuscatedVariableDeclaration1RegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *0x1;/;
            const obfuscatedVariableDeclaration2RegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *0x3;/;
            const ignoredVariableDeclarationRegExp: RegExp = /var *bar *= *2;/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/disable-and-enable-comments.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should obfuscate variable declaration before `disable` conditional comment', () => {
                assert.match(obfuscatedCode, obfuscatedVariableDeclaration1RegExp);
            });

            it('match #2: should ignore variable declaration after `disable` conditional comment', () => {
                assert.match(obfuscatedCode, ignoredVariableDeclarationRegExp);
            });

            it('match #3: should obfuscate variable declaration after `enable` conditional comment', () => {
                assert.match(obfuscatedCode, obfuscatedVariableDeclaration2RegExp);
            });
        });

        describe('Variant #3: `disable` conditional comment from beginning of the code', () => {
            const ignoredVariableDeclaration1RegExp: RegExp = /var *foo *= *1;/;
            const ignoredVariableDeclaration2RegExp: RegExp = /var *bar *= *2;/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/disable-from-beginning.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should ignore variable declaration after `disable` conditional comment', () => {
                assert.match(obfuscatedCode, ignoredVariableDeclaration1RegExp);
            });

            it('match #2: should ignore variable declaration after `disable` conditional comment', () => {
                assert.match(obfuscatedCode, ignoredVariableDeclaration2RegExp);
            });
        });

        describe('Variant #4: `disable` and `enable` conditional comments with dead code injection', () => {
            const obfuscatedFunctionExpressionRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *function *\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\) *{/g;
            const expectedObfuscatedFunctionExpressionLength: number = 3;

            const ignoredFunctionExpression1RegExp: RegExp = /var *bar *= *function *\(a, *b, *c\) *{/;
            const ignoredFunctionExpression2RegExp: RegExp = /var *baz *= *function *\(a, *b, *c\) *{/;

            const obfuscatedFunctionCallRegExp: RegExp = /_0x([a-f0-9]){4,6}\( *\);/g;
            const expectedObfuscatedFunctionCallsLength: number = 3;

            const ignoredFunctionCall1RegExp: RegExp = /bar\( *\);/;
            const ignoredFunctionCall2RegExp: RegExp = /baz\( *\);/;

            let obfuscatedCode: string,
                obfuscatedFunctionExpressionMatchesLength: number,
                obfuscatedFunctionCallMatchesLength: number;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/dead-code-injection.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1
                    }
                ).getObfuscatedCode();
                
                const obfuscatedFunctionExpressionMatches: RegExpMatchArray | null = obfuscatedCode.match(
                    obfuscatedFunctionExpressionRegExp
                );
                const obfuscatedFunctionCallMatches: RegExpMatchArray | null = obfuscatedCode.match(
                    obfuscatedFunctionCallRegExp
                );

                obfuscatedFunctionExpressionMatchesLength = obfuscatedFunctionExpressionMatches
                    ? obfuscatedFunctionExpressionMatches.length
                    : 0;

                obfuscatedFunctionCallMatchesLength = obfuscatedFunctionCallMatches
                    ? obfuscatedFunctionCallMatches.length
                    : 0;
            });

            it('match #1: should ignore function expression after `disable` conditional comment', () => {
                assert.match(obfuscatedCode, ignoredFunctionExpression1RegExp);
            });

            it('match #2: should ignore function expression after `disable` conditional comment', () => {
                assert.match(obfuscatedCode, ignoredFunctionExpression2RegExp);
            });

            it('match #3: should ignore function expression call', () => {
                assert.match(obfuscatedCode, ignoredFunctionCall1RegExp);
            });

            it('match #4: should ignore function expression call', () => {
                assert.match(obfuscatedCode, ignoredFunctionCall2RegExp);
            });

            it('should obfuscate 3 function expressions', () => {
                assert.equal(obfuscatedFunctionExpressionMatchesLength, expectedObfuscatedFunctionExpressionLength);
            });

            it('should obfuscate 3 function expression calls', () => {
                assert.equal(obfuscatedFunctionCallMatchesLength, expectedObfuscatedFunctionCallsLength);
            });
        });

        describe('Variant #5: `disable` and `enable` conditional comments with control flow flattening', () => {
            const obfuscatedVariableDeclarationRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\['[a-zA-Z0-9]{1,5}'];/;
            const ignoredVariableDeclarationRegExp: RegExp = /var *bar *= *'bar';/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/control-flow-flattening.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should obfuscate variable declaration before `disable` conditional comment', () => {
                assert.match(obfuscatedCode, obfuscatedVariableDeclarationRegExp);
            });

            it('match #2: should ignore variable declaration after `disable` conditional comment', () => {
                assert.match(obfuscatedCode, ignoredVariableDeclarationRegExp);
            });
        });
    });
});
