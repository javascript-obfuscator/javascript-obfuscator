import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { assert } from 'chai';

import { TStatement } from '../../../src/types/node/TStatement';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IStackTraceAnalyzer } from '../../../src/interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from '../../../src/interfaces/stack-trace-analyzer/IStackTraceData';

import { readFileAsString } from '../../helpers/readFileAsString';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';
import { NodeAppender } from '../../../src/node/NodeAppender';
import { Nodes } from '../../../src/node/Nodes';
import { NodeUtils } from '../../../src/node/NodeUtils';

describe('NodeAppender', () => {
    describe('appendNode (blockScopeNode: TNodeWithBlockStatement[], nodeBodyStatements: TStatement[]): void', () => {
        let astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: TStatement[];

        beforeEach(() => {
            node = NodeUtils.convertCodeToStructure(`
                var test = 1;
            `);

            astTree = Nodes.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/node-appender/append-node.js')
                )
            );

            expectedAstTree = Nodes.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/node-appender/append-node-expected.js')
                )
            );

            NodeUtils.parentize(astTree);
            NodeUtils.parentize(expectedAstTree);

            NodeAppender.appendNode(astTree, node);
        });

        it('should append given node to a `BlockStatement` node body', () => {
            assert.deepEqual(astTree, expectedAstTree);
        });
    });

    describe('appendNodeToOptimalBlockScope (blockScopeStackTraceData: IStackTraceData[], blockScopeNode: TNodeWithBlockStatement, nodeBodyStatements: TStatement[], index: number = 0): void', () => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade({});
        const stackTraceAnalyzer: IStackTraceAnalyzer = inversifyContainerFacade
            .get<IStackTraceAnalyzer>(ServiceIdentifiers.IStackTraceAnalyzer);

        let astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: TStatement[],
            stackTraceData: IStackTraceData[];

        beforeEach(() => {
            node = NodeUtils.convertCodeToStructure(`
                var test = 1;
            `);
        });

        it('should append node into first and deepest function call in calls trace - variant #1', () => {
            astTree = Nodes.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/node-appender/append-node-to-optimal-block-scope/variant-1.js')
                )
            );

            expectedAstTree = Nodes.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/node-appender/append-node-to-optimal-block-scope/variant-1-expected.js')
                )
            );

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);
            NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, astTree, node);

            assert.deepEqual(astTree, expectedAstTree);
        });

        it('should append node into first and deepest function call in calls trace - variant #2', () => {
            astTree = Nodes.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/node-appender/append-node-to-optimal-block-scope/variant-2.js')
                )
            );

            expectedAstTree = Nodes.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/node-appender/append-node-to-optimal-block-scope/variant-2-expected.js')
                )
            );

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);
            NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, astTree, node);

            assert.deepEqual(astTree, expectedAstTree);
        });

        describe('append by specific index', () => {
            let astTree: ESTree.Program;

            beforeEach(() => {
                astTree = Nodes.getProgramNode(
                    NodeUtils.convertCodeToStructure(
                        readFileAsString('./test/fixtures/node-appender/append-node-to-optimal-block-scope/by-index.js')

                    )
                );
            });

            it('should append node into deepest function call by specified index in calls trace - variant #1', () => {
                expectedAstTree = Nodes.getProgramNode(
                    NodeUtils.convertCodeToStructure(
                        readFileAsString('./test/fixtures/node-appender/append-node-to-optimal-block-scope/by-index-variant-1-expected.js')

                    )
                );

                stackTraceData = stackTraceAnalyzer.analyze(astTree.body);
                NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, astTree, node, 2);

                assert.deepEqual(astTree, expectedAstTree);
            });

            it('should append node into deepest function call by specified index in calls trace - variant #2', () => {
                expectedAstTree = Nodes.getProgramNode(
                    NodeUtils.convertCodeToStructure(
                        readFileAsString('./test/fixtures/node-appender/append-node-to-optimal-block-scope/by-index-variant-2-expected.js')

                    )
                );

                stackTraceData = stackTraceAnalyzer.analyze(astTree.body);
                NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, astTree, node, 1);

                assert.deepEqual(astTree, expectedAstTree);
            });

            it('should append node into deepest function call by specified index in calls trace - variant #3', () => {
                astTree = Nodes.getProgramNode(
                    NodeUtils.convertCodeToStructure(
                        readFileAsString('./test/fixtures/node-appender/append-node-to-optimal-block-scope/by-index-variant-3.js')
                    )
                );
                expectedAstTree = Nodes.getProgramNode(
                    NodeUtils.convertCodeToStructure(
                        readFileAsString('./test/fixtures/node-appender/append-node-to-optimal-block-scope/by-index-variant-3-expected.js')
                    )
                );

                stackTraceData = stackTraceAnalyzer.analyze(astTree.body);
                NodeAppender.appendNodeToOptimalBlockScope(
                    stackTraceData,
                    astTree,
                    node,
                    NodeAppender.getRandomStackTraceIndex(stackTraceData.length)
                );

                assert.deepEqual(astTree, expectedAstTree);
            });
        });
    });

    describe('getRandomStackTraceIndex (stackTraceRootLength: number): number', () => {
        it('should returns random index between 0 and stack trace data root length', () => {
            let index: number;

            for (let i: number = 0; i < 100; i++) {
                index = NodeAppender.getRandomStackTraceIndex(100);

                assert.isAtLeast(index, 0);
                assert.isAtMost(index, 100);
            }
        });
    });

    describe('insertNodeAtIndex (blockScopeNode: TNodeWithBlockStatement[], nodeBodyStatements: TStatement[], index: number): void', () => {
        let astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: TStatement[];

        beforeEach(() => {
            node = NodeUtils.convertCodeToStructure(`
                var test = 1;
            `);

            astTree = Nodes.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/node-appender/insert-node-at-index.js')
                )
            );

            expectedAstTree = Nodes.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/node-appender/insert-node-at-index-expected.js')
                )
            );

            NodeUtils.parentize(astTree);
            NodeUtils.parentize(expectedAstTree);

            NodeAppender.insertNodeAtIndex(astTree, node, 2);
        });

        it('should insert given node in `BlockStatement` node body at index', () => {
            assert.deepEqual(astTree, expectedAstTree);
        });
    });

    describe('prependNode (blockScopeNode: TNodeWithBlockStatement[], nodeBodyStatements: TStatement[]): void', () => {
        let astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: TStatement[];

        beforeEach(() => {
            node = NodeUtils.convertCodeToStructure(`
                var test = 1;
            `);

            astTree = Nodes.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/node-appender/prepend-node.js')
                )
            );

            expectedAstTree = Nodes.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/node-appender/prepend-node-expected.js')
                )
            );

            NodeUtils.parentize(astTree);
            NodeUtils.parentize(expectedAstTree);

            NodeAppender.prependNode(astTree, node);
        });

        it('should prepend given node to a `BlockStatement` node body', () => {
            assert.deepEqual(astTree, expectedAstTree);
        });
    });
});
