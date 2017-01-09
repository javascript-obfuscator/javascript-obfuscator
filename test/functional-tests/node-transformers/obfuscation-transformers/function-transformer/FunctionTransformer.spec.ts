import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('FunctionTransformer', () => {
    describe('identifiers transformation inside `FunctionDeclaration` and `FunctionExpression` node body', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/input.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

        it('should correct transform both function parameter identifier and function body identifier with same name', () => {
            const functionParamIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/var _0x[a-f0-9]{4,6} *= *function *\((_0x[a-f0-9]{4,6})\) *\{/);
            const functionBodyIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/console\['\\x6c\\x6f\\x67'\]\((_0x[a-f0-9]{4,6})\)/);

            const functionParamIdentifierName: string = (<RegExpMatchArray>functionParamIdentifierMatch)[1];
            const functionBodyIdentifierName: string = (<RegExpMatchArray>functionBodyIdentifierMatch)[1];

            assert.equal(functionParamIdentifierName, functionBodyIdentifierName);
        });

        it('shouldn\'t transform other variables in function body', () => {
            assert.equal(/variable *= *0x6;/.test(obfuscatedCode), true);
        });
    });
});
