import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('FunctionDeclarationTransformer', () => {
    describe('transformation of `functionDeclaration` node names', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/input.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

        it('shouldn\'t transform function name if `functionDeclaration` parent block scope is a `ProgramNode`', () => {
            const functionNameIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/function *foo *\(\) *\{/);
            const functionCallIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/foo *\( *\);/);

            const functionParamIdentifierName: string = (<RegExpMatchArray>functionNameIdentifierMatch)[1];
            const functionBodyIdentifierName: string = (<RegExpMatchArray>functionCallIdentifierMatch)[1];

            assert.equal(functionParamIdentifierName, functionBodyIdentifierName);
        });

        it('should transform function name if `functionDeclaration` parent block scope is not a `ProgramNode`', () => {
            const functionNameIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/function *_0x[a-f0-9]{4,6} *\(\) *\{/);
            const functionCallIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/_0x[a-f0-9]{4,6} *\( *\);/);

            const functionParamIdentifierName: string = (<RegExpMatchArray>functionNameIdentifierMatch)[1];
            const functionBodyIdentifierName: string = (<RegExpMatchArray>functionCallIdentifierMatch)[1];

            assert.equal(functionParamIdentifierName, functionBodyIdentifierName);
        });
    });
});
