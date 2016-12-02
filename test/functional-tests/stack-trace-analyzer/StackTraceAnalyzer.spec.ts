import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import * as chai from 'chai';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../../src/types/node/TNodeWithBlockStatement';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IStackTraceAnalyzer } from '../../../src/interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from '../../../src/interfaces/stack-trace-analyzer/IStackTraceData';

import { readFileAsString } from '../../helpers/readFileAsString';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';
import { Node } from '../../../src/node/Node';
import { NodeMocks } from '../../mocks/NodeMocks';
import { NodeUtils } from '../../../src/node/NodeUtils';

const assert: any = chai.assert;

/**
 * @param astTree
 * @param name
 * @returns {ESTree.FunctionDeclaration|null}
 */
function getFunctionDeclarationByName (astTree: ESTree.Node, name: string): ESTree.FunctionDeclaration|null {
    let functionDeclarationNode: ESTree.FunctionDeclaration|null = null;

    estraverse.traverse(astTree, {
        enter: (node: ESTree.Node): any => {
            if (
                Node.isFunctionDeclarationNode(node) &&
                Node.isIdentifierNode(node.id) &&
                node.id.name === name
            ) {
                functionDeclarationNode = node;

                return estraverse.VisitorOption.Break;
            }
        }
    });

    return functionDeclarationNode;
}

/**
 * @param astTree
 * @param name
 * @returns {ESTree.FunctionExpression|null}
 */
function getFunctionExpressionByName (astTree: ESTree.Node, name: string): ESTree.FunctionExpression|null {
    let functionExpressionNode: ESTree.FunctionExpression|null = null;

    estraverse.traverse(astTree, {
        enter: (node: ESTree.Node): any => {
            if (
                Node.isVariableDeclaratorNode(node) &&
                node.init &&
                Node.isFunctionExpressionNode(node.init) &&
                Node.isIdentifierNode(node.id) &&
                node.id.name === name
            ) {
                functionExpressionNode = node.init;

                return estraverse.VisitorOption.Break;
            }
        }
    });

    return functionExpressionNode;
}

/**
 * @param astTree
 * @param id
 * @returns {ESTree.FunctionExpression|null}
 */
function getFunctionExpressionById (astTree: ESTree.Node, id: string): ESTree.FunctionExpression|null {
    let functionExpressionNode: ESTree.FunctionExpression|null = null;

    estraverse.traverse(astTree, {
        enter: (node: ESTree.Node): any => {
            if (
                Node.isFunctionExpressionNode(node) &&
                node.id &&
                Node.isIdentifierNode(node.id) &&
                node.id.name === id
            ) {
                functionExpressionNode = node;

                return estraverse.VisitorOption.Break;
            }
        }
    });

    return functionExpressionNode;
}

/**
 * @param astTree
 * @param objectName
 * @param name
 * @returns {ESTree.FunctionExpression|null}
 */
function getObjectFunctionExpressionByName (astTree: ESTree.Node, objectName: string, name: string|number): ESTree.FunctionExpression|null {
    let functionExpressionNode: ESTree.FunctionExpression|null = null,
        targetObjectExpressionNode: ESTree.ObjectExpression|null = null;

    estraverse.traverse(astTree, {
        enter: (node: ESTree.Node): any => {
            if (
                Node.isVariableDeclaratorNode(node) &&
                Node.isIdentifierNode(node.id) &&
                node.init &&
                Node.isObjectExpressionNode(node.init) &&
                node.id.name === objectName
            ) {
                targetObjectExpressionNode = node.init;

                return estraverse.VisitorOption.Break;
            }
        }
    });

    if (!targetObjectExpressionNode) {
        return null;
    }

    estraverse.traverse(targetObjectExpressionNode, {
        enter: (node: ESTree.Node): any => {
            if (
                Node.isPropertyNode(node) &&
                Node.isFunctionExpressionNode(node.value) &&
                (
                    (Node.isIdentifierNode(node.key) && node.key.name === name) ||
                    (Node.isLiteralNode(node.key) && node.key.value === name)
                )
            ) {
                functionExpressionNode = node.value;

                return estraverse.VisitorOption.Break;
            }
        }
    });

    return functionExpressionNode;
}

describe('StackTraceAnalyzer', () => {
    describe('extract (): IStackTraceData[]', () => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade({});
        const stackTraceAnalyzer: IStackTraceAnalyzer = inversifyContainerFacade
            .get<IStackTraceAnalyzer>(ServiceIdentifiers.IStackTraceAnalyzer);

        let astTree: TNodeWithBlockStatement,
            stackTraceData: IStackTraceData[],
            expectedStackTraceData: IStackTraceData[];

        it('should returns correct IStackTraceData - variant #1: basic-1', () => {
            astTree = NodeMocks.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/stack-trace-analyzer/basic-1.js')
                )
            );

            expectedStackTraceData = [
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'baz')).body,
                    stackTrace: []
                },
                {
                    name: 'foo',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'foo')).body,
                    stackTrace: []
                },
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'bar')).body,
                    stackTrace: [
                        {
                            name: 'inner2',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'inner2')).body,
                            stackTrace: [
                                {
                                    name: 'inner3',
                                    callee: (<ESTree.FunctionExpression>getFunctionExpressionByName(astTree, 'inner3')).body,
                                    stackTrace: []
                                },
                            ]
                        },
                        {
                            name: 'inner1',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'inner1')).body,
                            stackTrace: []
                        },
                    ]
                }
            ];

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct IStackTraceData - variant #2: basic-2', () => {
            astTree = NodeMocks.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/stack-trace-analyzer/basic-2.js')
                )
            );

            expectedStackTraceData = [
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'bar')).body,
                    stackTrace: []
                },
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'baz')).body,
                    stackTrace: [
                        {
                            name: 'inner1',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'inner1')).body,
                            stackTrace: []
                        },
                    ]
                },
                {
                    name: 'foo',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'foo')).body,
                    stackTrace: []
                }
            ];

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct IStackTraceData - variant #3: deep conditions nesting', () => {
            astTree = NodeMocks.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/stack-trace-analyzer/deep-conditions-nesting.js')
                )
            );

            expectedStackTraceData = [
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'bar')).body,
                    stackTrace: []
                },
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'baz')).body,
                    stackTrace: [
                        {
                            name: 'inner1',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'inner1')).body,
                            stackTrace: []
                        },
                    ]
                },
                {
                    name: 'foo',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'foo')).body,
                    stackTrace: []
                }
            ];

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct IStackTraceData - variant #4: call before declaration', () => {
            astTree = NodeMocks.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/stack-trace-analyzer/call-before-declaration.js')
                )
            );

            expectedStackTraceData = [
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'bar')).body,
                    stackTrace: []
                }
            ];

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct IStackTraceData - variant #5: call expression of object member #1', () => {
            astTree = NodeMocks.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/stack-trace-analyzer/call-expression-of-object-member-1.js')
                )
            );

            expectedStackTraceData = [
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionExpression>getObjectFunctionExpressionByName(astTree, 'object1', 'baz')).body,
                    stackTrace: []
                },
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionExpression>getObjectFunctionExpressionByName(astTree, 'object1', 'baz')).body,
                    stackTrace: []
                },
                {
                    name: 'func',
                    callee: (<ESTree.FunctionExpression>getObjectFunctionExpressionByName(astTree, 'object1', 'func')).body,
                    stackTrace: []
                },
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionExpression>getObjectFunctionExpressionByName(astTree, 'object1', 'bar')).body,
                    stackTrace: [
                        {
                            name: 'inner1',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'inner1')).body,
                            stackTrace: [

                            ]
                        },
                    ]
                },
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionExpression>getObjectFunctionExpressionByName(astTree, 'object', 'bar')).body,
                    stackTrace: [
                        {
                            name: 'inner',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'inner')).body,
                            stackTrace: [

                            ]
                        },
                    ]
                }
            ];

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct IStackTraceData - variant #5: call expression of object member #2', () => {
            astTree = NodeMocks.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/stack-trace-analyzer/call-expression-of-object-member-2.js')
                )
            );

            expectedStackTraceData = [
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionExpression>getObjectFunctionExpressionByName(astTree, 'object', 'baz')).body,
                    stackTrace: []
                },
                {
                    name: 1,
                    callee: (<ESTree.FunctionExpression>getObjectFunctionExpressionByName(astTree, 'object1', 1)).body,
                    stackTrace: []
                },
            ];

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct IStackTraceData - variant #6: no call expressions', () => {
            astTree = NodeMocks.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/stack-trace-analyzer/no-call-expressions.js')
                )
            );

            expectedStackTraceData = [];

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct IStackTraceData - variant #7: only call expression', () => {
            astTree = NodeMocks.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/stack-trace-analyzer/only-call-expression.js')
                )
            );

            expectedStackTraceData = [];

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct IStackTraceData - variant #8: self-invoking functions', () => {
            astTree = NodeMocks.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/stack-trace-analyzer/self-invoking-functions.js')
                )
            );

            expectedStackTraceData = [
                {
                    name: null,
                    callee: (<ESTree.FunctionExpression>getFunctionExpressionById(astTree, 'foo')).body,
                    stackTrace: [{
                        name: null,
                        callee: (<ESTree.FunctionExpression>getFunctionExpressionById(astTree, 'bar')).body,
                        stackTrace: [{
                            name: null,
                            callee: (<ESTree.FunctionExpression>getFunctionExpressionById(astTree, 'baz')).body,
                            stackTrace: [{
                                name: 'inner',
                                callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'inner')).body,
                                stackTrace: []
                            }]
                        }]
                    }]
                }
            ];

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct IStackTraceData - variant #9: no recursion', () => {
            astTree = NodeMocks.getProgramNode(
                NodeUtils.convertCodeToStructure(
                    readFileAsString('./test/fixtures/stack-trace-analyzer/no-recursion.js')
                )
            );

            expectedStackTraceData = [
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionExpression>getFunctionExpressionByName(astTree, 'bar')).body,
                    stackTrace: []
                }
            ];

            stackTraceData = stackTraceAnalyzer.analyze(astTree.body);

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });
    });
});
