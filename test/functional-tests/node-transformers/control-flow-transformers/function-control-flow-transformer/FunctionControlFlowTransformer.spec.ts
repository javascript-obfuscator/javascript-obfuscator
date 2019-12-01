import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('FunctionControlFlowTransformer', function () {
    this.timeout(100000);

    const variableMatch: string = '_0x([a-f0-9]){4,6}';
    const rootControlFlowStorageNodeMatch: string = `` +
        `var *${variableMatch} *= *\\{` +
            `'\\w{5}' *: *function *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                `return *${variableMatch} *\\+ *${variableMatch};` +
            `\\}` +
        `\\};` +
    ``;
    const innerControlFlowStorageNodeMatch: string = `` +
        `var *${variableMatch} *= *\\{` +
            `'\\w{5}' *: *function *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                `return *${variableMatch}\\['\\w{5}'\\]\\(${variableMatch}, *${variableMatch}\\);` +
            `\\}` +
        `\\};` +
    ``;

    describe('transformNode', () => {
        describe('Variant #1 - single `control flow storage` node with single item', () => {
            const regexp: RegExp = new RegExp(rootControlFlowStorageNodeMatch);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should add `control flow storage` node to the obfuscated code', () => {
                assert.match(obfuscatedCode, regexp);
            });
        });

        describe('Variant #2 - two `control flow storage` nodes: root and inner', () => {
            const expectedAppendToScopeThreshold: number = 0.5;

            const samplesCount: number = 1000;
            const delta: number = 0.1;

            const regExp1: RegExp = new RegExp(
                `\\(function\\(\\) *\\{ *${rootControlFlowStorageNodeMatch}`,
                'g'
            );
            const regExp2: RegExp = new RegExp(
                `function *${variableMatch} *\\(\\) *\\{ *${innerControlFlowStorageNodeMatch}`,
                'g'
            );

            let appendToScopeThreshold: number = 0;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-2.js');

                let obfuscatedCode: string,
                    totalValue: number = 0;

                for (let i = 0; i < samplesCount; i++) {
                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 1
                        }
                    ).getObfuscatedCode();

                    if (regExp1.test(obfuscatedCode)) {
                        totalValue += obfuscatedCode.match(regExp1)!.length;

                        if (regExp2.test(obfuscatedCode)) {
                            totalValue += obfuscatedCode.match(regExp2)!.length;
                        }
                    }
                }

                appendToScopeThreshold = (totalValue - samplesCount) / samplesCount;
            });

            it('should add two `control flow storage` nodes (root and inner) to the obfuscated code in different scopes', () => {
                assert.closeTo(appendToScopeThreshold, expectedAppendToScopeThreshold, delta);
            });
        });

        describe('Variant #3 - single `control flow storage` node with multiple items', () => {
            const regexp: RegExp = new RegExp(
                `var *${variableMatch} *= *\\{` +
                    `'\\w{5}' *: *function *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                        `return *${variableMatch} *\\+ *${variableMatch};` +
                    `\\}, *` +
                    `'\\w{5}' *: *function *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                        `return *${variableMatch} *- *${variableMatch};` +
                    `\\}` +
                `\\};`
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/multiple-items.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should add `control flow storage` node with multiple items to the obfuscated code', () => {
                assert.match(obfuscatedCode, regexp);
            });
        });

        describe('Variant #4 - transformed node in the root block scope', () => {
            const regExp: RegExp = /^var *test *= *0x1 *\+ *0x2;$/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/root-block-scope-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should\'t add control flow storage node', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #5 - transformed nodes not in the root block scope', () => {
            const expectedValue: number = 0;
            const samplesCount: number = 20;

            const regExp: RegExp = new RegExp(
                `var *[a-zA-Z]{6} *= *\\{` +
                    `'\\w{5}' *: *function *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                        `return *${variableMatch} *\\+ *${variableMatch};` +
                    `\\}` +
                `\\};`
            );

            const code: string = readFileAsString(__dirname + '/fixtures/root-block-scope-2.js');

            let totalValue: number = 0;

            before(() => {
                for (let i = 0; i < samplesCount; i++) {

                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 1
                        }
                    ).getObfuscatedCode();

                    if (regExp.test(obfuscatedCode)) {
                        totalValue++;
                    }
                }
            });

            it('should\'t add control flow storage node to the root block scope', () => {
                assert.equal(totalValue, expectedValue);
            });
        });

        describe('Variant #6 - threshold is `0`', () => {
            const regexp: RegExp = /var *_0x([a-f0-9]){4,6} *= *0x1 *\+ *0x2;/;
            const controlFlowStorageRegExp: RegExp = new RegExp(rootControlFlowStorageNodeMatch);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/zero-threshold.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 0
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t add call to control flow storage node to the obfuscated code', () => {
                assert.match(obfuscatedCode, regexp);
            });

            it('shouldn\'t add `control flow storage` node to the obfuscated code', () => {
                assert.notMatch(obfuscatedCode, controlFlowStorageRegExp);
            });
        });

        describe('arrow function expression', () => {
            describe('Variant #1 - arrow function expression with body', () => {
                const regexp: RegExp = new RegExp(rootControlFlowStorageNodeMatch);

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/arrow-function-expression-with-body.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should add `control flow storage` node to the obfuscated code', () => {
                    assert.match(obfuscatedCode, regexp);
                });
            });

            describe('Variant #2 - arrow function expression without body', () => {
                const regexp: RegExp = new RegExp(`var *${variableMatch} *= *\\(\\) *=> *0x1 *\\+ *0x2;`);

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/arrow-function-expression-without-body.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('shouldn\'t add `control flow storage` node to the obfuscated code', () => {
                    assert.match(obfuscatedCode, regexp);
                });
            });
        });
    });
});
