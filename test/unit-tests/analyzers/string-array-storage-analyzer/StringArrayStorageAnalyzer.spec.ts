import 'reflect-metadata';

import { assert } from 'chai';
import * as ESTree from 'estree';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { TInputOptions } from '../../../../src/types/options/TInputOptions';

import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { IStringArrayStorageAnalyzer } from '../../../../src/interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IStringArrayStorageItemData } from '../../../../src/interfaces/storages/string-array-transformers/IStringArrayStorageItem';

import { StringArrayEncoding } from '../../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';
import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NodeMetadata } from '../../../../src/node/NodeMetadata';

const getStringArrayStorageAnalyzer = (options: TInputOptions): IStringArrayStorageAnalyzer => {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

    inversifyContainerFacade.load('', '', options);

    return inversifyContainerFacade.get<IStringArrayStorageAnalyzer>(ServiceIdentifiers.IStringArrayStorageAnalyzer);
};

describe('StringArrayStorageAnalyzer', () => {
    let stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer;

    describe('analyze', () => {
        describe('Base analyze of the AST tree', () => {
            const literalNode1: ESTree.Literal = NodeFactory.literalNode('foo');
            const literalNode2: ESTree.Literal = NodeFactory.literalNode('bar');
            const literalNode3: ESTree.Literal = NodeFactory.literalNode('baz');

            const expectedStringArrayStorageItemData1: IStringArrayStorageItemData = {
                encodedValue: 'foo',
                encoding: StringArrayEncoding.None,
                decodeKey: null,
                index: 0,
                value: 'foo'
            };
            const expectedStringArrayStorageItemData2: IStringArrayStorageItemData = {
                encodedValue: 'bar',
                encoding: StringArrayEncoding.None,
                decodeKey: null,
                index: 1,
                value: 'bar'
            };
            const expectedStringArrayStorageItemData3: undefined = undefined;

            let stringArrayStorageItemData1: IStringArrayStorageItemData | undefined;
            let stringArrayStorageItemData2: IStringArrayStorageItemData | undefined;
            let stringArrayStorageItemData3: IStringArrayStorageItemData | undefined;

            before(() => {
                stringArrayStorageAnalyzer = getStringArrayStorageAnalyzer({
                    stringArrayThreshold: 1
                });

                const astTree: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.expressionStatementNode(literalNode1),
                    NodeFactory.expressionStatementNode(literalNode2)
                ]);

                stringArrayStorageAnalyzer.analyze(astTree);
                stringArrayStorageItemData1 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode1);
                stringArrayStorageItemData2 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode2);
                stringArrayStorageItemData3 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode3);
            });

            it('Variant #1: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData1, expectedStringArrayStorageItemData1);
            });

            it('Variant #2: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData2, expectedStringArrayStorageItemData2);
            });

            it('Variant #3: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData3, expectedStringArrayStorageItemData3);
            });
        });

        describe('Base analyze of the AST tree with string literal nodes with values shorter than allowed length', () => {
            const literalNode1: ESTree.Literal = NodeFactory.literalNode('foo');
            const literalNode2: ESTree.Literal = NodeFactory.literalNode('ba');

            const expectedStringArrayStorageItemData1: IStringArrayStorageItemData = {
                encodedValue: 'foo',
                encoding: StringArrayEncoding.None,
                decodeKey: null,
                index: 0,
                value: 'foo'
            };
            const expectedStringArrayStorageItemData2: undefined = undefined;

            let stringArrayStorageItemData1: IStringArrayStorageItemData | undefined;
            let stringArrayStorageItemData2: IStringArrayStorageItemData | undefined;

            before(() => {
                stringArrayStorageAnalyzer = getStringArrayStorageAnalyzer({
                    stringArrayThreshold: 1
                });

                const astTree: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.expressionStatementNode(literalNode1),
                    NodeFactory.expressionStatementNode(literalNode2)
                ]);

                stringArrayStorageAnalyzer.analyze(astTree);
                stringArrayStorageItemData1 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode1);
                stringArrayStorageItemData2 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode2);
            });

            it('Variant #1: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData1, expectedStringArrayStorageItemData1);
            });

            it('Variant #2: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData2, expectedStringArrayStorageItemData2);
            });
        });

        describe('Base analyze of the AST tree with number literal nodes', () => {
            const literalNode1: ESTree.Literal = NodeFactory.literalNode('foo');
            const literalNode2: ESTree.Literal = NodeFactory.literalNode(1);

            const expectedStringArrayStorageItemData1: IStringArrayStorageItemData = {
                encodedValue: 'foo',
                encoding: StringArrayEncoding.None,
                decodeKey: null,
                index: 0,
                value: 'foo'
            };
            const expectedStringArrayStorageItemData2: undefined = undefined;

            let stringArrayStorageItemData1: IStringArrayStorageItemData | undefined;
            let stringArrayStorageItemData2: IStringArrayStorageItemData | undefined;

            before(() => {
                stringArrayStorageAnalyzer = getStringArrayStorageAnalyzer({
                    stringArrayThreshold: 1
                });

                const astTree: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.expressionStatementNode(literalNode1),
                    NodeFactory.expressionStatementNode(literalNode2)
                ]);

                stringArrayStorageAnalyzer.analyze(astTree);
                stringArrayStorageItemData1 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode1);
                stringArrayStorageItemData2 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode2);
            });

            it('Variant #1: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData1, expectedStringArrayStorageItemData1);
            });

            it('Variant #2: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData2, expectedStringArrayStorageItemData2);
            });
        });

        describe('Analyzes of the AST tree with prohibited string literal nodes', () => {
            const literalNode1: ESTree.Literal = NodeFactory.literalNode('foo');
            const literalNode2: ESTree.Literal = NodeFactory.literalNode('bar');

            const expectedStringArrayStorageItemData1: IStringArrayStorageItemData = {
                encodedValue: 'foo',
                encoding: StringArrayEncoding.None,
                decodeKey: null,
                index: 0,
                value: 'foo'
            };
            const expectedStringArrayStorageItemData2: undefined = undefined;

            let stringArrayStorageItemData1: IStringArrayStorageItemData | undefined;
            let stringArrayStorageItemData2: IStringArrayStorageItemData | undefined;

            before(() => {
                stringArrayStorageAnalyzer = getStringArrayStorageAnalyzer({
                    stringArrayThreshold: 1
                });

                const astTree: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.expressionStatementNode(literalNode1),
                    NodeFactory.variableDeclarationNode([
                        NodeFactory.variableDeclaratorNode(
                            NodeFactory.identifierNode('bar'),
                            NodeFactory.objectExpressionNode([
                                NodeFactory.propertyNode(
                                    literalNode2,
                                    NodeFactory.literalNode(1)
                                )
                            ])
                        )
                    ])
                ]);

                stringArrayStorageAnalyzer.analyze(astTree);
                stringArrayStorageItemData1 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode1);
                stringArrayStorageItemData2 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode2);
            });

            it('Variant #1: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData1, expectedStringArrayStorageItemData1);
            });

            it('Variant #2: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData2, expectedStringArrayStorageItemData2);
            });
        });

        describe('Analyzes of the AST tree with ignored string literal nodes', () => {
            const literalNode1: ESTree.Literal = NodeFactory.literalNode('foo');
            const literalNode2: ESTree.Literal = NodeFactory.literalNode('bar');
            NodeMetadata.set(literalNode2, {ignoredNode: true});

            const expectedStringArrayStorageItemData1: IStringArrayStorageItemData = {
                encodedValue: 'foo',
                encoding: StringArrayEncoding.None,
                decodeKey: null,
                index: 0,
                value: 'foo'
            };
            const expectedStringArrayStorageItemData2: undefined = undefined;

            let stringArrayStorageItemData1: IStringArrayStorageItemData | undefined;
            let stringArrayStorageItemData2: IStringArrayStorageItemData | undefined;

            before(() => {
                stringArrayStorageAnalyzer = getStringArrayStorageAnalyzer({
                    stringArrayThreshold: 1
                });

                const astTree: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.expressionStatementNode(literalNode1),
                    NodeFactory.expressionStatementNode(literalNode2)
                ]);

                stringArrayStorageAnalyzer.analyze(astTree);
                stringArrayStorageItemData1 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode1);
                stringArrayStorageItemData2 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode2);
            });

            it('Variant #1: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData1, expectedStringArrayStorageItemData1);
            });

            it('Variant #2: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData2, expectedStringArrayStorageItemData2);
            });
        });

        describe('Analyzes of the AST tree with force transform string literal nodes', () => {
            describe('Variant #1: Force obfuscate string when threshold is `0`', () => {
                const literalNode1: ESTree.Literal = NodeFactory.literalNode('foo');
                const literalNode2: ESTree.Literal = NodeFactory.literalNode('bar');
                NodeMetadata.set(literalNode2, {forceTransformNode: true});

                const expectedStringArrayStorageItemData1: undefined = undefined;
                const expectedStringArrayStorageItemData2: IStringArrayStorageItemData = {
                    encodedValue: 'bar',
                    encoding: StringArrayEncoding.None,
                    decodeKey: null,
                    index: 0,
                    value: 'bar'
                };

                let stringArrayStorageItemData1: IStringArrayStorageItemData | undefined;
                let stringArrayStorageItemData2: IStringArrayStorageItemData | undefined;

                before(() => {
                    stringArrayStorageAnalyzer = getStringArrayStorageAnalyzer({
                        stringArrayThreshold: 0
                    });

                    const astTree: ESTree.Program = NodeFactory.programNode([
                        NodeFactory.expressionStatementNode(literalNode1),
                        NodeFactory.expressionStatementNode(literalNode2)
                    ]);

                    stringArrayStorageAnalyzer.analyze(astTree);
                    stringArrayStorageItemData1 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode1);
                    stringArrayStorageItemData2 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode2);
                });

                it('Variant #1: should return correct string array storage item data for literal node #1', () => {
                    assert.deepEqual(stringArrayStorageItemData1, expectedStringArrayStorageItemData1);
                });

                it('Variant #2: should return correct string array storage item data for literal node #1', () => {
                    assert.deepEqual(stringArrayStorageItemData2, expectedStringArrayStorageItemData2);
                });
            });

            describe('Variant #2: Force obfuscate string when string value shorter than allowed length', () => {
                const literalNode1: ESTree.Literal = NodeFactory.literalNode('a');
                const literalNode2: ESTree.Literal = NodeFactory.literalNode('b');
                NodeMetadata.set(literalNode2, {forceTransformNode: true});

                const expectedStringArrayStorageItemData1: undefined = undefined;
                const expectedStringArrayStorageItemData2: IStringArrayStorageItemData = {
                    encodedValue: 'b',
                    encoding: StringArrayEncoding.None,
                    decodeKey: null,
                    index: 0,
                    value: 'b'
                };

                let stringArrayStorageItemData1: IStringArrayStorageItemData | undefined;
                let stringArrayStorageItemData2: IStringArrayStorageItemData | undefined;

                before(() => {
                    stringArrayStorageAnalyzer = getStringArrayStorageAnalyzer({
                        stringArrayThreshold: 1
                    });

                    const astTree: ESTree.Program = NodeFactory.programNode([
                        NodeFactory.expressionStatementNode(literalNode1),
                        NodeFactory.expressionStatementNode(literalNode2)
                    ]);

                    stringArrayStorageAnalyzer.analyze(astTree);
                    stringArrayStorageItemData1 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode1);
                    stringArrayStorageItemData2 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode2);
                });

                it('Variant #1: should return correct string array storage item data for literal node #1', () => {
                    assert.deepEqual(stringArrayStorageItemData1, expectedStringArrayStorageItemData1);
                });

                it('Variant #2: should return correct string array storage item data for literal node #1', () => {
                    assert.deepEqual(stringArrayStorageItemData2, expectedStringArrayStorageItemData2);
                });
            });
        });

        /**
         * This test covers rare case when with random value inside `shouldAddValueToStringArray` was `0`
         * that trigger positive check for method.
         *
         * As fix i added check of `this.options.stringArray` option value
         */
        describe('Analyzes of the AST tree with disabled string array', () => {
            const literalNode1: ESTree.Literal = NodeFactory.literalNode('foo');
            const literalNode2: ESTree.Literal = NodeFactory.literalNode('bar');

            const expectedStringArrayStorageItemData1: undefined = undefined;
            const expectedStringArrayStorageItemData2: undefined = undefined;

            let stringArrayStorageItemData1: IStringArrayStorageItemData | undefined;
            let stringArrayStorageItemData2: IStringArrayStorageItemData | undefined;

            before(() => {
                stringArrayStorageAnalyzer = getStringArrayStorageAnalyzer({
                    stringArray: false,
                    stringArrayThreshold: 1
                });
                (<any>stringArrayStorageAnalyzer).options.stringArrayThreshold = 1;

                const astTree: ESTree.Program = NodeFactory.programNode([
                    NodeFactory.expressionStatementNode(literalNode1),
                    NodeFactory.expressionStatementNode(literalNode2)
                ]);

                stringArrayStorageAnalyzer.analyze(astTree);
                stringArrayStorageItemData1 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode1);
                stringArrayStorageItemData2 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode2);
            });

            it('Variant #1: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData1, expectedStringArrayStorageItemData1);
            });

            it('Variant #2: should return correct string array storage item data for literal node #1', () => {
                assert.deepEqual(stringArrayStorageItemData2, expectedStringArrayStorageItemData2);
            });
        });

        describe('Analyzes of the AST tree with string array threshold', () => {
            describe('Threshold value: 0', () => {
                const literalNode1: ESTree.Literal = NodeFactory.literalNode('foo');
                const literalNode2: ESTree.Literal = NodeFactory.literalNode('bar');

                const expectedStringArrayStorageItemData1: undefined = undefined;
                const expectedStringArrayStorageItemData2: undefined = undefined;

                let stringArrayStorageItemData1: IStringArrayStorageItemData | undefined;
                let stringArrayStorageItemData2: IStringArrayStorageItemData | undefined;

                before(() => {
                    stringArrayStorageAnalyzer = getStringArrayStorageAnalyzer({
                        stringArrayThreshold: 0
                    });

                    const astTree: ESTree.Program = NodeFactory.programNode([
                        NodeFactory.expressionStatementNode(literalNode1),
                        NodeFactory.expressionStatementNode(literalNode2)
                    ]);

                    stringArrayStorageAnalyzer.analyze(astTree);
                    stringArrayStorageItemData1 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode1);
                    stringArrayStorageItemData2 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode2);
                });

                it('Variant #1: should return correct string array storage item data for literal node #1', () => {
                    assert.deepEqual(stringArrayStorageItemData1, expectedStringArrayStorageItemData1);
                });

                it('Variant #2: should return correct string array storage item data for literal node #1', () => {
                    assert.deepEqual(stringArrayStorageItemData2, expectedStringArrayStorageItemData2);
                });
            });

            describe('Threshold value: 0.5', () => {
                const literalNode1: ESTree.Literal = NodeFactory.literalNode('foo');
                const literalNode2: ESTree.Literal = NodeFactory.literalNode('bar');

                const expectedStringArrayStorageItemData1: undefined = undefined;
                const expectedStringArrayStorageItemData2: IStringArrayStorageItemData = {
                    encodedValue: 'bar',
                    encoding: StringArrayEncoding.None,
                    decodeKey: null,
                    index: 0,
                    value: 'bar'
                };

                let stringArrayStorageItemData1: IStringArrayStorageItemData | undefined;
                let stringArrayStorageItemData2: IStringArrayStorageItemData | undefined;

                before(() => {
                    stringArrayStorageAnalyzer = getStringArrayStorageAnalyzer({
                        stringArrayThreshold: 0.5,
                        seed: 3
                    });

                    const astTree: ESTree.Program = NodeFactory.programNode([
                        NodeFactory.expressionStatementNode(literalNode1),
                        NodeFactory.expressionStatementNode(literalNode2)
                    ]);

                    stringArrayStorageAnalyzer.analyze(astTree);
                    stringArrayStorageItemData1 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode1);
                    stringArrayStorageItemData2 = stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode2);
                });

                it('Variant #1: should return correct string array storage item data for literal node #1', () => {
                    assert.deepEqual(stringArrayStorageItemData1, expectedStringArrayStorageItemData1);
                });

                it('Variant #2: should return correct string array storage item data for literal node #2', () => {
                    assert.deepEqual(stringArrayStorageItemData2, expectedStringArrayStorageItemData2);
                });
            });
        });
    });
});
