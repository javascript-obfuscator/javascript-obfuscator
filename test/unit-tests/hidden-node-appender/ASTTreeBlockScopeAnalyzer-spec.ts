import * as chai from 'chai';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../../src/types/TNodeWithBlockStatement';

import { IBlockScopeTraceData } from '../../../src/interfaces/IBlockScopeTraceData';

import { ASTTreeBlockScopeAnalyzer } from '../../../src/hidden-node-appender/ASTTreeBlockScopeAnalyzer';
import { Nodes } from '../../../src/Nodes';
import { NodeUtils } from '../../../src/NodeUtils';

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

describe('ASTTreeBlockScopeAnalyzer', () => {
    describe('analyze (): IBlockScopeTraceData[]', () => {
        let ASTTree: TNodeWithBlockStatement,
            blockScopeTraceData: IBlockScopeTraceData[],
            expectedBlockScopeTraceData: IBlockScopeTraceData[];

        it('should returns correct BlockScopeTraceData - variant #1', () => {
            ASTTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
                function foo () {
                
                }
                
                function bar () {
                    function inner1 () {
                    
                    }
                
                    function inner2 () {
                        var inner3 = function () {
                            
                        }
                        
                        inner3();
                    }
                    
                    inner2();
                    inner1();
                }
                
                function baz () {
                
                }
                
                baz();
                foo();
                bar();
            `, false);

            expectedBlockScopeTraceData = [
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'baz')).body,
                    trace: []
                },
                {
                    name: 'foo',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'foo')).body,
                    trace: []
                },
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'bar')).body,
                    trace: [
                        {
                            name: 'inner2',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'inner2')).body,
                            trace: [
                                {
                                    name: 'inner3',
                                    callee: (<ESTree.FunctionExpression>getFunctionExpressionByName(ASTTree, 'inner3')).body,
                                    trace: []
                                },
                            ]
                        },
                        {
                            name: 'inner1',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'inner1')).body,
                            trace: []
                        },
                    ]
                }
            ];

            blockScopeTraceData = new ASTTreeBlockScopeAnalyzer<IBlockScopeTraceData>(ASTTree.body).analyze();

            assert.deepEqual(blockScopeTraceData, expectedBlockScopeTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #2', () => {
            ASTTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
                bar();
            
                function foo () {
                
                }
                
                function bar () {
                    
                }
                
                function baz () {
                    function inner1 () {
                    
                    }
                    
                    inner1();
                }
                
                baz();
                foo();
            `, false);

            expectedBlockScopeTraceData = [
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'bar')).body,
                    trace: []
                },
                {
                    name: 'baz',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'baz')).body,
                    trace: [
                        {
                            name: 'inner1',
                            callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'inner1')).body,
                            trace: []
                        },
                    ]
                },
                {
                    name: 'foo',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'foo')).body,
                    trace: []
                }
            ];

            blockScopeTraceData = new ASTTreeBlockScopeAnalyzer<IBlockScopeTraceData>(ASTTree.body).analyze();

            assert.deepEqual(blockScopeTraceData, expectedBlockScopeTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #3', () => {
            ASTTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
                bar();
            
                function bar () {
                
                }
            `, false);

            expectedBlockScopeTraceData = [
                {
                    name: 'bar',
                    callee: (<ESTree.FunctionDeclaration>getFunctionDeclarationByName(ASTTree, 'bar')).body,
                    trace: []
                }
            ];

            blockScopeTraceData = new ASTTreeBlockScopeAnalyzer<IBlockScopeTraceData>(ASTTree.body).analyze();

            assert.deepEqual(blockScopeTraceData, expectedBlockScopeTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #4', () => {
            ASTTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
                function bar () {
                
                }
            `, false);

            expectedBlockScopeTraceData = [];

            blockScopeTraceData = new ASTTreeBlockScopeAnalyzer<IBlockScopeTraceData>(ASTTree.body).analyze();

            assert.deepEqual(blockScopeTraceData, expectedBlockScopeTraceData);
        });

        it('should returns correct BlockScopeTraceData - variant #5', () => {
            ASTTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
                bar();
            `, false);

            expectedBlockScopeTraceData = [];

            blockScopeTraceData = new ASTTreeBlockScopeAnalyzer<IBlockScopeTraceData>(ASTTree.body).analyze();

            assert.deepEqual(blockScopeTraceData, expectedBlockScopeTraceData);
        });
    });
});
