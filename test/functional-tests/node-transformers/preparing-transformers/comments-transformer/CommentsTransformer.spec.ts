import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('CommentsTransformer', () => {
    describe('variant #1: simple comment without preserved words', () => {
        const regExp: RegExp = /^var *test *= *0x1;$/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/no-preserved-words.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should remove comments without preserved words', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('variant #2: simple comment with preserved words', () => {
        const regExp: RegExp = /^\/\/ *@license *test *comment *\n*var *test *= *0x1;$/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/preserved-words.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should keep comments with preserved words', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('variant #3: comment with preserved and non-preserved words', () => {
        const regExp: RegExp = /^\/\/ *@license *test *comment *\n*var *test *= *0x1;$/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/combined-words-1.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should keep comments with preserved words', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('variant #4: comment with preserved and non-preserved words', () => {
        const regExp: RegExp = new RegExp(``+
            `^\\/\\*\\* *\\n` +
            ` *\\* *@license *\\n` +
            ` *\\* *test\\n` +
            ` *\\*\\/\\n` +
            `var *test *= *0x1;` +
            ` *\\/\\*\\* *@preserved *\\*\\/$` +
        ``);

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/combined-words-2.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should keep comments with preserved words', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('variant #5: only comment without preserved words', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/comments-only-1.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should remove comment without preserved words', () => {
            assert.isNotOk(obfuscatedCode);
        });
    });

    describe('variant #5: only comment with preserved words', () => {
        const regExp: RegExp = /^\/\/ *@license$/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/comments-only-2.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should keep comments with preserved words', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });
});
