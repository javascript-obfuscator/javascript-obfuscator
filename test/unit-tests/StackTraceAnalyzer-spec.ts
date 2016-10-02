import * as chai from 'chai';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../src/types/TNodeWithBlockStatement';

import { IStackTraceData } from '../../src/interfaces/IStackTraceData';

import { readFileAsString } from '../helpers/readFileAsString';

import { Nodes } from '../../src/Nodes';
import { NodeUtils } from '../../src/NodeUtils';
import { StackTraceAnalyzer } from '../../src/StackTraceAnalyzer';

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

describe('StackTraceAnalyzer', () => {
    describe('analyze (): IStackTraceData[]', () => {
        let ASTTree: TNodeWithBlockStatement,
            blockScopeTraceData: IStackTraceData[],
            expectedBlockScopeTraceData: IStackTraceData[];

        it('should returns correct BlockScopeTraceData - variant #1', () => {
            ASTTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString(
                    require.resolve('../fixtures/stack-trace-analyzer/variant-1.js')
                ),
                false
            );

            expectedBlockScopeTraceData = [
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'baz')).body,
                    stackTrace: []
                },
                {
                    name: 'foo',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'foo')).body,
                    stackTrace: []
                },
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'bar')).body,
                    stackTrace: [
                        {
                            name: 'inner2',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'inner2')).body,
                            stackTrace: [
                                {
                                    name: 'inner3',
                                    callee: (<ESTree.FunctionExpression>getFunctionExpressionByName(ASTTree, 'inner3')).body,
                                    stackTrace: []
                                },
                            ]
                        },
                        {
                            name: 'inner1',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'inner1')).body,
                            stackTrace: []
                        },
                    ]
                }
            ];

            blockScopeTraceData = new StackTraceAnalyzer(ASTTree.body).analyze();

            assert.deepEqual(blockScopeTraceData, expectedBlockScopeTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #2', () => {
            ASTTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString(
                    require.resolve('../fixtures/stack-trace-analyzer/variant-2.js')
                ),
                false
            );

            expectedBlockScopeTraceData = [
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'bar')).body,
                    stackTrace: []
                },
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'baz')).body,
                    stackTrace: [
                        {
                            name: 'inner1',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'inner1')).body,
                            stackTrace: []
                        },
                    ]
                },
                {
                    name: 'foo',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'foo')).body,
                    stackTrace: []
                }
            ];

            blockScopeTraceData = new StackTraceAnalyzer(ASTTree.body).analyze();

            assert.deepEqual(blockScopeTraceData, expectedBlockScopeTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #3', () => {
            ASTTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString(
                    require.resolve('../fixtures/stack-trace-analyzer/variant-3.js')
                ),
                false
            );

            expectedBlockScopeTraceData = [
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'bar')).body,
                    stackTrace: []
                }
            ];

            blockScopeTraceData = new StackTraceAnalyzer(ASTTree.body).analyze();

            assert.deepEqual(blockScopeTraceData, expectedBlockScopeTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #4', () => {
            ASTTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString(
                    require.resolve('../fixtures/stack-trace-analyzer/variant-4.js')
                ),
                false
            );

            expectedBlockScopeTraceData = [];

            blockScopeTraceData = new StackTraceAnalyzer(ASTTree.body).analyze();

            assert.deepEqual(blockScopeTraceData, expectedBlockScopeTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #5', () => {
            ASTTree = <ESTree.Program>NodeUtils.convertCodeToStructure(
                readFileAsString(
                    require.resolve('../fixtures/stack-trace-analyzer/variant-5.js')
                ),
                false
            );

            expectedBlockScopeTraceData = [];

            blockScopeTraceData = new StackTraceAnalyzer(ASTTree.body).analyze();

            assert.deepEqual(blockScopeTraceData, expectedBlockScopeTraceData);
        });
    });
});
