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
                    './test/fixtures/node-transformers/control-flow-transformers/block-statement-control-flow-transformer-1.js'
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

        describe('variant #2: 5 simple statements inside while loop without break or continue statement', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(
                    './test/fixtures/node-transformers/control-flow-transformers/block-statement-control-flow-transformer-2.js'
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

        describe('variant #3: less then 5 statements', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(
                    './test/fixtures/node-transformers/control-flow-transformers/block-statement-control-flow-transformer-one-statement.js'
                ),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *console\['(\\x[a-f0-9]*){3}'\]\(0x1\); *\} *\( *\) *\);$/;

            it('shouldn\'t transform block statement if statements length less than 5', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('variant #4: const declaration inside block statement', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(
                    './test/fixtures/node-transformers/control-flow-transformers/block-statement-control-flow-transformer-const-declaration.js'
                ),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *const *_0x([a-z0-9]){4,6} *= *0x1; *console\['(\\x[a-f0-9]*){3}'\]\(0x1\);/;

            it('shouldn\'t transform block statement if block statement contain variable declaration with `const` kind', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('variant #5: let declaration inside block statement', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(
                    './test/fixtures/node-transformers/control-flow-transformers/block-statement-control-flow-transformer-let-declaration.js'
                ),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *let *_0x([a-z0-9]){4,6} *= *0x1; *console\['(\\x[a-f0-9]*){3}'\]\(0x1\);/;

            it('shouldn\'t transform block statement if block statement contain variable declaration with `let` kind', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('variant #6: break statement inside block statement', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(
                    './test/fixtures/node-transformers/control-flow-transformers/block-statement-control-flow-transformer-break-statement.js'
                ),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *while *\(!!\[\]\) *\{ *break; *console\['(\\x[a-f0-9]*){3}'\]\(0x1\);/;

            it('shouldn\'t transform block statement if block statement contain break statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('variant #7: continue statement inside block statement', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(
                    './test/fixtures/node-transformers/control-flow-transformers/block-statement-control-flow-transformer-continue-statement.js'
                ),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *while *\(!!\[\]\) *\{ *continue; *console\['(\\x[a-f0-9]*){3}'\]\(0x1\);/;

            it('shouldn\'t transform block statement if block statement contain continue statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('variant #8: function declaration inside block statement', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(
                    './test/fixtures/node-transformers/control-flow-transformers/block-statement-control-flow-transformer-function-declaration.js'
                ),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *function *_0x([a-z0-9]){4,6} *\( *\) *\{ *\} *console\['(\\x[a-f0-9]*){3}'\]\(0x1\);/;

            it('shouldn\'t transform block statement if block statement contain function declaration', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('variant #9: `controlFlowFlatteningThreshold` chance', () => {
            const samples: number = 1000;
            const controlFlowFlatteningThreshold: number = 0.5;
            const delta: number = 0.1;
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(
                    './test/fixtures/node-transformers/control-flow-transformers/block-statement-control-flow-transformer-1.js'
                ).repeat(samples),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: controlFlowFlatteningThreshold,
                }
            );

            const regExp1: RegExp = /switch *\(_0x([a-z0-9]){4,6}\[_0x([a-z0-9]){4,6}\+\+\]\) *\{/g;
            const regExp2: RegExp = /\(function *\( *\) *\{ *console\['(\\x[a-f0-9]*){3}'\]\(0x1\);/g;
            const transformedStatementMatchesLength = obfuscationResult.getObfuscatedCode().match(regExp1)!.length;
            const untouchedStatementMatchesLength = obfuscationResult.getObfuscatedCode().match(regExp2)!.length;

            it('should transform block statement with `controlFlowFlatteningThreshold` chance', () => {
                assert.closeTo(transformedStatementMatchesLength / samples, controlFlowFlatteningThreshold, delta);
                assert.closeTo(untouchedStatementMatchesLength / samples, controlFlowFlatteningThreshold, delta);
            });
        });
    });
});
