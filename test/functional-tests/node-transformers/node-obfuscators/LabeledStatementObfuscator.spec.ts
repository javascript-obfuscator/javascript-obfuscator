import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('LabeledStatementObfuscator', () => {
    describe('changeControlFlow (labeledStatementNode: ESTree.LabeledStatement): void', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(
                './test/fixtures/node-transformers/node-obfuscators/labeled-statement-obfuscator/labeled-statement-obfuscator.js'
            ),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
        const labeledStatementRegExp: RegExp = /(_0x([a-z0-9]){4,6}): *\{/;
        const continueStatementRegExp: RegExp = /continue *(_0x([a-z0-9]){4,6});/;
        const breakStatementRegExp: RegExp = /break *(_0x([a-z0-9]){4,6});/;

        it('should obfuscate `labeledStatement` identifier', () => {
            assert.match(obfuscatedCode, labeledStatementRegExp);
        });

        it('should obfuscate `continueStatement` identifier', () => {
            assert.match(obfuscatedCode, continueStatementRegExp);
        });

        it('should obfuscate `breakStatement` identifier', () => {
            assert.match(obfuscatedCode, breakStatementRegExp);
        });

        it('`labeledStatement` identifier name and `labeledStatement` body `breakStatement` should be same', () => {
            const firstMatchArray: RegExpMatchArray|null = obfuscatedCode.match(labeledStatementRegExp);
            const secondMatchArray: RegExpMatchArray|null = obfuscatedCode.match(continueStatementRegExp);
            const thirdMatchArray: RegExpMatchArray|null = obfuscatedCode.match(breakStatementRegExp);

            const firstMatch: string|undefined = firstMatchArray ? firstMatchArray[1] : undefined;
            const secondMatch: string|undefined = secondMatchArray ? secondMatchArray[1] : undefined;
            const thirdMatch: string|undefined = thirdMatchArray ? thirdMatchArray[1] : undefined;

            assert.isOk(firstMatch);
            assert.isOk(secondMatch);
            assert.isOk(thirdMatchArray);
            assert.equal(firstMatch, secondMatch);
            assert.equal(secondMatch, thirdMatch);
        });
    });
});
