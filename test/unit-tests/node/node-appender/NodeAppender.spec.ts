import 'reflect-metadata';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { assert } from 'chai';

import { TStatement } from '../../../../src/types/node/TStatement';

import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { IStackTraceAnalyzer } from '../../../../src/interfaces/analyzers/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from '../../../../src/interfaces/analyzers/stack-trace-analyzer/IStackTraceData';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';
import { NodeAppender } from '../../../../src/node/NodeAppender';
import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NodeUtils } from '../../../../src/node/NodeUtils';
import { removeRangesFromStructure } from '../../../helpers/removeRangesFromStructure';

/**
 * @param fixturePath
 * @return {TStatement[]}
 */
const convertCodeToStructure: (fixturePath: string) => TStatement[] = (fixturePath) => {
    return removeRangesFromStructure(
        NodeUtils.convertCodeToStructure(
            readFileAsString(`${__dirname}${fixturePath}`)
        )
    );
};

/**
 * @param fixturePath
 * @return {ESTree.Program}
 */
const convertCodeToAst: (fixturePath: string) => ESTree.Program = (fixturePath) => {
    return NodeFactory.programNode(convertCodeToStructure(fixturePath));
};

describe('NodeAppender', () => {
    describe('append', () => {
        let astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: TStatement[];

        before(() => {
            node = convertCodeToStructure('/fixtures/simple-input.js');
            astTree = convertCodeToAst('/fixtures/append-node.js');
            expectedAstTree = convertCodeToAst('/fixtures/append-node-expected.js');

            astTree = NodeUtils.parentizeAst(astTree);
            expectedAstTree = NodeUtils.parentizeAst(expectedAstTree);

            NodeAppender.append(astTree, node);
        });

        it('should append given node to a `BlockStatement` node body', () => {
            assert.deepEqual(astTree, expectedAstTree);
        });
    });

    describe('appendToOptimalBlockScope', () => {
        let stackTraceAnalyzer: IStackTraceAnalyzer,
            astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: TStatement[],
            stackTraceData: IStackTraceData[];

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', '', {});
            stackTraceAnalyzer = inversifyContainerFacade
                .get<IStackTraceAnalyzer>(ServiceIdentifiers.IStackTraceAnalyzer);
        });

        beforeEach(() => {
            node = convertCodeToStructure('/fixtures/simple-input.js');
        });

        describe('Variant #1: nested function calls', () => {
            beforeEach(() => {
                astTree = convertCodeToAst('/fixtures/append-node-to-optimal-block-scope/variant-1.js');
                expectedAstTree = convertCodeToAst('/fixtures/append-node-to-optimal-block-scope/variant-1-expected.js');

                stackTraceData = stackTraceAnalyzer.analyze(astTree);
                NodeAppender.appendToOptimalBlockScope(stackTraceData, astTree, node);
            });

            it('should append node into first and deepest function call in nested function calls', () => {
                assert.deepEqual(astTree, expectedAstTree);
            });
        });

        describe('Variant #2: nested function calls', () => {
            beforeEach(() => {
                astTree = convertCodeToAst('/fixtures/append-node-to-optimal-block-scope/variant-2.js');
                expectedAstTree = convertCodeToAst('/fixtures/append-node-to-optimal-block-scope/variant-2-expected.js');

                stackTraceData = stackTraceAnalyzer.analyze(astTree);
                NodeAppender.appendToOptimalBlockScope(stackTraceData, astTree, node);

            });

            it('should append node into first and deepest function call in nested function calls', () => {
                assert.deepEqual(astTree, expectedAstTree);
            });
        });

        describe('append by specific index', () => {
            let astTree: ESTree.Program;

            beforeEach(() => {
                astTree = convertCodeToAst('/fixtures/append-node-to-optimal-block-scope/by-index.js');
            });

            describe('Variant #1: append by specific index in nested function calls', () => {
                beforeEach(() => {
                    expectedAstTree = convertCodeToAst('/fixtures/append-node-to-optimal-block-scope/by-index-variant-1-expected.js');

                    stackTraceData = stackTraceAnalyzer.analyze(astTree);
                    NodeAppender.appendToOptimalBlockScope(stackTraceData, astTree, node, 2);

                });

                it('should append node into deepest function call by specified index in nested function calls', () => {
                    assert.deepEqual(astTree, expectedAstTree);
                });
            });

            describe('Variant #2: append by specific index in nested function calls', () => {
                beforeEach(() => {
                    expectedAstTree = convertCodeToAst('/fixtures/append-node-to-optimal-block-scope/by-index-variant-2-expected.js');

                    stackTraceData = stackTraceAnalyzer.analyze(astTree);
                    NodeAppender.appendToOptimalBlockScope(stackTraceData, astTree, node, 1);

                });

                it('should append node into deepest function call by specified index in nested function calls', () => {
                    assert.deepEqual(astTree, expectedAstTree);
                });
            });

            describe('Variant #3: append by specific index in nested function calls', () => {
                beforeEach(() => {
                    astTree = convertCodeToAst('/fixtures/append-node-to-optimal-block-scope/by-index-variant-3.js');
                    expectedAstTree = convertCodeToAst('/fixtures/append-node-to-optimal-block-scope/by-index-variant-3-expected.js');

                    stackTraceData = stackTraceAnalyzer.analyze(astTree);
                    NodeAppender.appendToOptimalBlockScope(
                        stackTraceData,
                        astTree,
                        node,
                        stackTraceData.length - 1
                    );

                });

                it('should append node into deepest function call by specified index in nested function calls', () => {
                    assert.deepEqual(astTree, expectedAstTree);
                });
            });
        });
    });

    describe('insertAfter', () => {
        let astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: TStatement[],
            targetStatement: ESTree.Statement;

        before(() => {
            node = convertCodeToStructure('/fixtures/simple-input.js');
            astTree = convertCodeToAst('/fixtures/insert-node-after.js');
            expectedAstTree = convertCodeToAst('/fixtures/insert-node-after-expected.js');
            targetStatement = <ESTree.Statement>astTree.body[1];

            astTree = NodeUtils.parentizeAst(astTree);
            expectedAstTree = NodeUtils.parentizeAst(expectedAstTree);

            NodeAppender.insertAfter(astTree, node, targetStatement);
        });

        it('should insert given node in `BlockStatement` node body after target statement', () => {
            assert.deepEqual(astTree, expectedAstTree);
        });
    });

    describe('insertAtIndex', () => {
        let astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: TStatement[];

        before(() => {
            node = convertCodeToStructure('/fixtures/simple-input.js');
            astTree = convertCodeToAst('/fixtures/insert-node-at-index.js');
            expectedAstTree = convertCodeToAst('/fixtures/insert-node-at-index-expected.js');

            astTree = NodeUtils.parentizeAst(astTree);
            expectedAstTree = NodeUtils.parentizeAst(expectedAstTree);

            NodeAppender.insertAtIndex(astTree, node, 2);
        });

        it('should insert given node in `BlockStatement` node body at index', () => {
            assert.deepEqual(astTree, expectedAstTree);
        });
    });

    describe('prepend', () => {
        let astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: TStatement[];

        before(() => {
            node = convertCodeToStructure('/fixtures/simple-input.js');
            astTree = convertCodeToAst('/fixtures/prepend-node.js');
            expectedAstTree = convertCodeToAst('/fixtures/prepend-node-expected.js');

            astTree = NodeUtils.parentizeAst(astTree);
            expectedAstTree = NodeUtils.parentizeAst(expectedAstTree);

            NodeAppender.prepend(astTree, node);
        });

        it('should prepend given node to a `BlockStatement` node body', () => {
            assert.deepEqual(astTree, expectedAstTree);
        });
    });
});
