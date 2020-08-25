import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('LabeledStatementTransformer', () => {
    describe('transformNode', () => {
        const labeledStatementRegExp: RegExp = /(_0x([a-f0-9]){4,6}): *for/;
        const continueStatementRegExp: RegExp = /continue *(_0x([a-f0-9]){4,6});/;
        const breakStatementRegExp: RegExp = /break *(_0x([a-f0-9]){4,6});/;

        let obfuscatedCode: string,
            firstMatch: string|undefined,
            secondMatch: string|undefined,
            thirdMatch: string|undefined;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();

            firstMatch = getRegExpMatch(obfuscatedCode, labeledStatementRegExp);
            secondMatch = getRegExpMatch(obfuscatedCode, continueStatementRegExp);
            thirdMatch = getRegExpMatch(obfuscatedCode, breakStatementRegExp);
        });

        it('should transform `labeledStatement` identifier', () => {
            assert.match(obfuscatedCode, labeledStatementRegExp);
        });

        it('should transform `continueStatement` identifier', () => {
            assert.match(obfuscatedCode, continueStatementRegExp);
        });

        it('should transform `breakStatement` identifier', () => {
            assert.match(obfuscatedCode, breakStatementRegExp);
        });

        it('equal #1: `labeledStatement` identifier name and `labeledStatement` body `breakStatement` should be same', () => {
            assert.equal(firstMatch, secondMatch);
        });

        it('equal #2: `labeledStatement` identifier name and `labeledStatement` body `breakStatement` should be same', () => {
            assert.equal(secondMatch, thirdMatch);
        });
    });
});
