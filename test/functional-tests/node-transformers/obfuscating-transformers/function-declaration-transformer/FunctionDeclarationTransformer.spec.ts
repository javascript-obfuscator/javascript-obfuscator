import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('FunctionDeclarationTransformer', () => {
    describe('transformation of `functionDeclaration` node names', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        describe('variant #1: `functionDeclaration` parent block scope is not a `ProgramNode`', () => {
            const functionNameIdentifierRegExp: RegExp = /function *_0x[a-f0-9]{4,6} *\(\) *\{/;
            const functionCallIdentifierRegExp: RegExp = /_0x[a-f0-9]{4,6} *\( *\);/;

            let functionParamIdentifierName: string,
                functionBodyIdentifierName: string;

            before(() => {
                const functionNameIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                    .match(functionNameIdentifierRegExp);
                const functionCallIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                    .match(functionCallIdentifierRegExp);

                functionParamIdentifierName = (<RegExpMatchArray>functionNameIdentifierMatch)[1];
                functionBodyIdentifierName = (<RegExpMatchArray>functionCallIdentifierMatch)[1];
            });

            it('should transform function name', () => {
                assert.equal(functionParamIdentifierName, functionBodyIdentifierName);
            });
        });

        describe('variant #2: `functionDeclaration` parent block scope is a `ProgramNode`', () => {
            const functionNameIdentifierRegExp: RegExp = /function *foo *\(\) *\{/;
            const functionCallIdentifierRegExp: RegExp = /foo *\( *\);/;

            let functionParamIdentifierName: string,
                functionBodyIdentifierName: string;

            before(() => {
                const functionNameIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                    .match(functionNameIdentifierRegExp);
                const functionCallIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                    .match(functionCallIdentifierRegExp);

                functionParamIdentifierName = (<RegExpMatchArray>functionNameIdentifierMatch)[1];
                functionBodyIdentifierName = (<RegExpMatchArray>functionCallIdentifierMatch)[1];
            });

            it('shouldn\'t transform function name', () => {
                assert.equal(functionParamIdentifierName, functionBodyIdentifierName);
            });
        });
    });
});
