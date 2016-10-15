import * as chai from 'chai';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../../src/types/TNodeWithBlockStatement';

import { IStackTraceData } from '../../../src/interfaces/stack-trace-analyzer/IStackTraceData';

import { readFileAsString } from '../../helpers/readFileAsString';

import { Nodes } from '../../../src/Nodes';
import { NodeUtils } from '../../../src/NodeUtils';
import { StackTraceAnalyzer } from '../../../src/stack-trace-analyzer/StackTraceAnalyzer';

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
                Nodes.isFunctionDeclarationNode(node) &&
                Nodes.isIdentifierNode(node.id) &&
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
                Nodes.isVariableDeclaratorNode(node) &&
                node.init &&
                Nodes.isFunctionExpressionNode(node.init) &&
                Nodes.isIdentifierNode(node.id) &&
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
 * @param name
 * @returns {ESTree.FunctionExpression|null}
 */
function getObjectFunctionExpressionByName (astTree: ESTree.Node, name: string): ESTree.FunctionExpression|null {
    let functionExpressionNode: ESTree.FunctionExpression|null = null;

    estraverse.traverse(astTree, {
        enter: (node: ESTree.Node): any => {
            if (
                Nodes.isPropertyNode(node) &&
                Nodes.isFunctionExpressionNode(node.value) &&
                Nodes.isIdentifierNode(node.key) &&
                node.key.name === name
            ) {
                functionExpressionNode = node.value;

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
                Nodes.isFunctionExpressionNode(node) &&
                node.id &&
                Nodes.isIdentifierNode(node.id) &&
                node.id.name === id
            ) {
                functionExpressionNode = node;

                return estraverse.VisitorOption.Break;
            }
        }
    });

    return functionExpressionNode;
}

describe('StackTraceAnalyzer', () => {
    describe('extract (): IStackTraceData[]', () => {
        let astTree: TNodeWithBlockStatement,
            stackTraceData: IStackTraceData[],
            expectedStackTraceData: IStackTraceData[];

        it('should returns correct IStackTraceData - variant #1: basic-1', () => {
            astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString('./test/fixtures/stack-trace-analyzer/basic-1.js'),
                false
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

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #2: basic-2', () => {
            astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString('./test/fixtures/stack-trace-analyzer/basic-2.js'),
                false
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

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #3: deep conditions nesting', () => {
            astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString('./test/fixtures/stack-trace-analyzer/deep-conditions-nesting.js'),
                false
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

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #4: call before declaration', () => {
            astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString('./test/fixtures/stack-trace-analyzer/call-before-declaration.js'),
                false
            );

            expectedStackTraceData = [
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'bar')).body,
                    stackTrace: []
                }
            ];

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #5: call expression of object member', () => {
            astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString('./test/fixtures/stack-trace-analyzer/call-expression-of-object-member.js'),
                false
            );

            expectedStackTraceData = [
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionExpression>getObjectFunctionExpressionByName(astTree, 'baz')).body,
                    stackTrace: []
                },
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionExpression>getObjectFunctionExpressionByName(astTree, 'baz')).body,
                    stackTrace: []
                },
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionExpression>getObjectFunctionExpressionByName(astTree, 'bar')).body,
                    stackTrace: [
                        {
                            name: 'inner1',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(astTree, 'inner1')).body,
                            stackTrace: [

                            ]
                        },
                    ]
                },
            ];

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #6: no call expressions', () => {
            astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString('./test/fixtures/stack-trace-analyzer/no-call-expressions.js'),
                false
            );

            expectedStackTraceData = [];

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #7: only call expression', () => {
            astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString('./test/fixtures/stack-trace-analyzer/only-call-expression.js'),
                false
            );

            expectedStackTraceData = [];

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #8: self-invoking functions', () => {
            astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString('./test/fixtures/stack-trace-analyzer/self-invoking-functions.js'),
                false
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

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();

            assert.deepEqual(stackTraceData, expectedStackTraceData);
        });
    });
});
