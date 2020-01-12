import 'reflect-metadata';

import { assert } from 'chai';
import * as ESTree from 'estree';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { TInputOptions } from '../../../../src/types/options/TInputOptions';

import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { IStringArrayStorageAnalyzer } from '../../../../src/interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IStringArrayStorageItemData } from '../../../../src/interfaces/storages/string-array-storage/IStringArrayStorageItem';

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
                decodeKey: null,
                index: 0,
                value: 'foo'
            };
            const expectedStringArrayStorageItemData2: IStringArrayStorageItemData = {
                encodedValue: 'bar',
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

        describe('Analyzes of the AST tree with ignored nodes', () => {
            const literalNode1: ESTree.Literal = NodeFactory.literalNode('foo');
            const literalNode2: ESTree.Literal = NodeFactory.literalNode('bar');
            NodeMetadata.set(literalNode2, {ignoredNode: true});

            const expectedStringArrayStorageItemData1: IStringArrayStorageItemData = {
                encodedValue: 'foo',
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

        describe('Analyzes of the AST tree string array threshold', () => {
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
                    decodeKey: null,
                    index: 0,
                    value: 'bar'
                };

                let stringArrayStorageItemData1: IStringArrayStorageItemData | undefined;
                let stringArrayStorageItemData2: IStringArrayStorageItemData | undefined;

                before(() => {
                    stringArrayStorageAnalyzer = getStringArrayStorageAnalyzer({
                        stringArrayThreshold: 0.5,
                        seed: 1
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
