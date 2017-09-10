import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../../src/interfaces/IObfuscationResult';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

describe('ConditionalCommentObfuscatingGuard', () => {
    describe('check (node: ESTree.Node): boolean', () => {
        describe('variant #1: `disable` conditional comment', () => {
            const obfuscatedVariableDeclarationRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *0x1;/;
            const ignoredVariableDeclarationRegExp: RegExp = /var *bar *= *2;/;
            const consoleLogRegExp: RegExp = /console.log\(_0x([a-f0-9]){4,6}\);/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
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

        describe('variant #2: `disable` and `enable` conditional comment', () => {
            const obfuscatedVariableDeclaration1RegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *0x1;/;
            const obfuscatedVariableDeclaration2RegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *0x3;/;
            const ignoredVariableDeclarationRegExp: RegExp = /var *bar *= *2;/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/disable-and-enable-comments.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
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
    });
});
