import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('CatchClauseTransformer', () => {
    let obfuscatedCode: string;

    describe('changeControlFlow (catchClauseNode: ESTree.CatchClause): void', () => {
        const paramNameRegExp: RegExp = /catch *\((_0x([a-f0-9]){4,6})\) *\{/;
        const bodyParamNameRegExp: RegExp = /console\['log'\]\((_0x([a-f0-9]){4,6})\);/;

        let firstMatch: string | undefined,
            secondMatch: string | undefined;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
            firstMatch = getRegExpMatch(obfuscatedCode, paramNameRegExp);
            secondMatch = getRegExpMatch(obfuscatedCode, bodyParamNameRegExp);
        });

        it('match #1: should transform catch clause node', () => {
            assert.match(obfuscatedCode, paramNameRegExp);
        });

        it('match #2: should transform catch clause node', () => {
            assert.match(obfuscatedCode, bodyParamNameRegExp);
        });

        it('catch clause arguments param name and param name in body should be same', () => {
            assert.equal(firstMatch, secondMatch);
        });
    });

    describe('object pattern as parameter', () => {
        const functionParameterMatch: RegExp = /\} *catch *\(\{ *name *\}\) *\{/;
        const functionBodyMatch: RegExp = /return *name;/;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-pattern-as-parameter.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('match #1: shouldn\'t transform function parameter object pattern identifier', () => {
            assert.match(obfuscatedCode, functionParameterMatch);
        });

        it('match #2: shouldn\'t transform function parameter object pattern identifier', () => {
            assert.match(obfuscatedCode, functionBodyMatch);
        });
    });
});
