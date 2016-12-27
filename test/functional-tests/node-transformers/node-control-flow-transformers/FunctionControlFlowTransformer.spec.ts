import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('FunctionControlFlowTransformer', () => {
    const variableMatch: string = '_0x([a-z0-9]){4,6}';
    const rootControlFlowStorageNodeMatch: string = `` +
        `var *${variableMatch} *= *\\{` +
            `'(\\\\x[a-f0-9]*){3}' *: *function *${variableMatch} *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                `return *${variableMatch} *\\+ *${variableMatch};` +
            `\\}` +
        `\\};` +
    ``;
    const innerControlFlowStorageNodeMatch: string = `` +
        `var *${variableMatch} *= *\\{` +
            `'(\\\\x[a-f0-9]*){3}' *: *function *${variableMatch} *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                `return *${variableMatch}\\['(\\\\x[a-f0-9]*){3}'\\]\\(${variableMatch}, *${variableMatch}\\);` +
            `\\}` +
        `\\};` +
    ``;

    describe('transformNode (functionNode: ESTree.Function): ESTree.Node', () => {
        describe('variant #1 - single `control flow storage` node with single item', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(
                    './test/fixtures/node-transformers/node-control-flow-transformers/function-control-flow-transformer-1.js'
                ),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
            const regexp: RegExp = new RegExp(rootControlFlowStorageNodeMatch);

            it('should add `control flow storage` node to the obfuscated code', () => {
                assert.match(obfuscatedCode, regexp);
            });
        });

        describe('variant #2 - two `control flow storage` nodes: root and inner', () => {
            const samplesCount: number = 150;
            const delta: number = 0.1;
            const expectedValue: number = 0.5;
            const regExp1: RegExp = new RegExp(
                `\\(function\\(\\) *\\{ *${rootControlFlowStorageNodeMatch}`,
                'g'
            );
            const regExp2: RegExp = new RegExp(
                `function *${variableMatch} *\\(\\) *\\{ *${innerControlFlowStorageNodeMatch}`,
                'g'
            );

            let totalValue: number = 0;

            for (let i = 0; i < samplesCount; i++) {
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    readFileAsString(
                        './test/fixtures/node-transformers/node-control-flow-transformers/function-control-flow-transformer-2.js'
                    ),
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                );
                const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

                if (regExp1.test(obfuscatedCode)) {
                    totalValue += obfuscatedCode.match(regExp1)!.length;

                    if (regExp2.test(obfuscatedCode)) {
                        totalValue += obfuscatedCode.match(regExp2)!.length;
                    }
                }
            }

            it('should add two `control flow storage` nodes (root and inner) to the obfuscated code in different scopes', () => {
                assert.closeTo((totalValue - samplesCount) / samplesCount, expectedValue, delta);
            });
        });
    });
});
