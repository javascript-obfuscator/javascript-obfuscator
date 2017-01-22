import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('FunctionControlFlowTransformer', () => {
    const variableMatch: string = '_0x([a-f0-9]){4,6}';
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
                readFileAsString(__dirname + '/fixtures/input-1.js'),
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
            const samplesCount: number = 1000;
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
                    readFileAsString(__dirname + '/fixtures/input-2.js'),
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

        describe('variant #3 - single `control flow storage` node with multiple items', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/multiple-items.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
            const regexp: RegExp = new RegExp(
                `var *${variableMatch} *= *\\{` +
                    `'(\\\\x[a-f0-9]*){3}' *: *function *${variableMatch} *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                        `return *${variableMatch} *\\+ *${variableMatch};` +
                    `\\}, *` +
                    `'(\\\\x[a-f0-9]*){3}' *: *function *${variableMatch} *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                        `return *${variableMatch} *- *${variableMatch};` +
                    `\\}` +
                `\\};`
            );

            it('should add `control flow storage` node with multiple items to the obfuscated code', () => {
                assert.match(obfuscatedCode, regexp);
            });
        });

        describe('variant #4 - no `control flow storage` node to the root block scope', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/root-block-scope-1.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            it('should\'t add control flow storage node when transformed node in the root block scope', () => {
                assert.match(obfuscatedCode, /^var *test *= *0x1 *\+ *0x2;$/);
            });
        });

        describe('variant #5 - no `control flow storage` node in the root block scope', () => {
            const samplesCount: number = 20;
            const expectedValue: number = 0;
            const regExp: RegExp = new RegExp(
                `var *[a-zA-Z]{6} *= *\\{` +
                    `'(\\\\x[a-f0-9]*){3}' *: *function *_0x[0-9] *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                        `return *${variableMatch} *\\+ *${variableMatch};` +
                    `\\}` +
                `\\};`
            );


            it('should\'t add control flow storage node to the root block scope when transformed nodes not in the root block scope', () => {
                let totalValue: number = 0;

                for (let i = 0; i < samplesCount; i++) {
                    const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        readFileAsString(__dirname + '/fixtures/root-block-scope-2.js'),
                        {
                            ...NO_CUSTOM_NODES_PRESET,
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 1
                        }
                    );
                    const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

                    if (regExp.test(obfuscatedCode)) {
                        totalValue++;
                    }
                }

                assert.equal(totalValue, expectedValue);
            });
        });

        describe('variant #6 - no single `control flow storage` node when threshold is 0', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/zero-threshold.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 0
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
            const controlFlowStorageMatch: RegExp = new RegExp(rootControlFlowStorageNodeMatch);
            const regexp: RegExp = /var *_0x([a-f0-9]){4,6} *= *0x1 *\+ *0x2;/;

            it('shouldn\'t add `control flow storage` node to the obfuscated code when threshold is 0', () => {
                assert.match(obfuscatedCode, regexp);
                assert.notMatch(obfuscatedCode, controlFlowStorageMatch);
            });
        });

        describe('arrow function expression', () => {
            describe('variant #1 - arrow function expression with body', () => {
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    readFileAsString(__dirname + '/fixtures/arrow-function-expression-with-body.js'),
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

            describe('variant #2 - arrow function expression without body', () => {
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    readFileAsString(__dirname + '/fixtures/arrow-function-expression-without-body.js'),
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                );
                const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
                const regexp: RegExp = new RegExp(`var *${variableMatch} *= *\\(\\) *=> *0x1 *\\+ *0x2;`);

                it('shouldn\'t add `control flow storage` node to the obfuscated code', () => {
                    assert.match(obfuscatedCode, regexp);
                });
            });
        });
    });
});
