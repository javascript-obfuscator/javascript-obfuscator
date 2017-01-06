import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('BlockStatementControlFlowTransformer', () => {
    describe('transformNode (blockStatementNode: ESTree.BlockStatement): ESTree.Node', () => {
        describe('variant #1: 5 simple statements', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(
                    './test/fixtures/node-transformers/node-control-flow-transformers/block-statement-control-flow-transformer-1.js'
                ),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1,
                    unicodeEscapeSequence: false
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            const statementRegExp1: RegExp = /console\['log'\]\(0x1\);/;
            const statementRegExp2: RegExp = /console\['log'\]\(0x2\);/;
            const statementRegExp3: RegExp = /console\['log'\]\(0x3\);/;
            const statementRegExp4: RegExp = /console\['log'\]\(0x4\);/;
            const statementRegExp5: RegExp = /console\['log'\]\(0x5\);/;

            const switchCaseRegExp: RegExp = /switch *\(_0x([a-z0-9]){4,6}\[_0x([a-z0-9]){4,6}\+\+\]\) *\{/;
            const switchCaseLengthRegExp: RegExp = /case *'[0-5]': *console\['log'\]\(0x[0-6]\);/g;
            const switchCaseLength: number = obfuscatedCode.match(switchCaseLengthRegExp)!.length;

            const switchCaseMapRegExp: RegExp = /var *_0x(?:[a-z0-9]){4,6} *= *'(.*?)'/;
            const switchCaseMapMatches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(switchCaseMapRegExp);
            const switchCaseMapMatch: string = switchCaseMapMatches[1];
            const switchCaseMap: string[] = switchCaseMapMatch.replace(/\\x7c/g, '|').split('|').sort();

            it('should save all statements', () => {
                assert.match(obfuscatedCode, statementRegExp1);
                assert.match(obfuscatedCode, statementRegExp2);
                assert.match(obfuscatedCode, statementRegExp3);
                assert.match(obfuscatedCode, statementRegExp4);
                assert.match(obfuscatedCode, statementRegExp5);
            });

            it('should wrap block statement statements in switch case structure', () => {
                assert.match(obfuscatedCode, switchCaseRegExp);
                assert.equal(switchCaseLength, 5);
            });

            it('should create variable with order of switch cases sequence', () => {
                assert.deepEqual(switchCaseMap, ['0', '1', '2', '3', '4']);
            });
        });
    });
});
