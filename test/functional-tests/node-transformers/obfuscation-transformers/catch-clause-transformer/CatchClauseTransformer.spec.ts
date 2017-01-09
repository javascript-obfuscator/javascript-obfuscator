import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('CatchClauseTransformer', () => {
    describe('changeControlFlow (catchClauseNode: ESTree.CatchClause): void', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/input.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
        const paramNameRegExp: RegExp = /catch *\((_0x([a-f0-9]){4,6})\) *\{/;
        const bodyParamNameRegExp: RegExp = /console\['\\x6c\\x6f\\x67'\]\((_0x([a-f0-9]){4,6})\);/;

        it('should transform catch clause node', () => {
            assert.match(obfuscatedCode, paramNameRegExp);
            assert.match(obfuscatedCode, bodyParamNameRegExp);
        });

        it('catch clause arguments param name and param name in body should be same', () => {
            const firstMatchArray: RegExpMatchArray | null = obfuscatedCode.match(paramNameRegExp);
            const secondMatchArray: RegExpMatchArray | null = obfuscatedCode.match(bodyParamNameRegExp);

            const firstMatch: string | undefined = firstMatchArray ? firstMatchArray[1] : undefined;
            const secondMatch: string | undefined = secondMatchArray ? secondMatchArray[1] : undefined;

            assert.isOk(firstMatch);
            assert.isOk(secondMatch);
            assert.equal(firstMatch, secondMatch);
        });
    });
});
