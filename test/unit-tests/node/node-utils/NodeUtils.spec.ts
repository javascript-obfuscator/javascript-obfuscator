import * as ESTree from 'estree';

import { assert } from 'chai';

import { TStatement } from '../../../../src/types/node/TStatement';

import { removeRangesFromStructure } from '../../../helpers/removeRangesFromStructure';

import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NodeUtils } from '../../../../src/node/NodeUtils';

describe('NodeUtils', () => {
    describe('addXVerbatimPropertyTo', () => {
        let literalNode: ESTree.Literal,
            expectedLiteralNode: ESTree.Literal;

        before(() => {
            literalNode = NodeFactory.literalNode('value');
            delete literalNode['x-verbatim-property'];

            expectedLiteralNode = NodeFactory.literalNode('value');

            NodeUtils.addXVerbatimPropertyTo(literalNode);
        });

        it('should add `x-verbatim-property` to `Literal` node', () => {
            assert.deepEqual(literalNode, expectedLiteralNode);
        });
    });

    describe('clone', () => {
        describe('Variant #1: simple AST-tree', () => {
            let programNode: ESTree.Program,
                expectedProgramNode: ESTree.Program;

            before(() => {
                // actual AST tree
                const expressionStatementNode1: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
                const expressionStatementNode2: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));

                const ifStatementBlockStatementNode1: ESTree.BlockStatement = NodeFactory.blockStatementNode([
                    expressionStatementNode1,
                    expressionStatementNode2
                ]);

                const ifStatementNode1: ESTree.IfStatement = NodeFactory.ifStatementNode(
                    NodeFactory.literalNode(true),
                    ifStatementBlockStatementNode1
                );

                // expected AST tree
                const expressionStatementNode3: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
                const expressionStatementNode4: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));

                const ifStatementBlockStatementNode2: ESTree.BlockStatement = NodeFactory.blockStatementNode([
                    expressionStatementNode3,
                    expressionStatementNode4
                ]);

                const ifStatementNode2: ESTree.IfStatement = NodeFactory.ifStatementNode(
                    NodeFactory.literalNode(true),
                    ifStatementBlockStatementNode2
                );

                programNode = NodeUtils.clone(
                    NodeFactory.programNode([
                        ifStatementNode1
                    ])
                );
                expectedProgramNode = NodeUtils.parentizeAst(
                    NodeFactory.programNode([
                        ifStatementNode2
                    ])
                );
            });

            it('should clone given AST-tree', () => {
                assert.deepEqual(programNode, expectedProgramNode);
            });
        });

        describe('Variant #2: array expression with `null` element', () => {
            let programNode: ESTree.Program,
                expectedProgramNode: ESTree.Program;

            before(() => {
                // actual AST tree
                const arrayExpressionNode: ESTree.ArrayExpression = NodeFactory.arrayExpressionNode([
                    NodeFactory.literalNode(1),
                    NodeFactory.literalNode(2),
                    <any>null,
                    NodeFactory.literalNode(4)
                ]);
                const expressionStatementNode: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(
                    arrayExpressionNode
                );

                // expected AST tree
                const expectedArrayExpressionNode: ESTree.ArrayExpression = NodeFactory.arrayExpressionNode([
                    NodeFactory.literalNode(1),
                    NodeFactory.literalNode(2),
                    <any>null,
                    NodeFactory.literalNode(4)
                ]);
                const expectedExpressionStatementNode: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(
                    expectedArrayExpressionNode
                );

                programNode = NodeUtils.clone(
                    NodeFactory.programNode([
                        expressionStatementNode
                    ])
                );
                expectedProgramNode = NodeUtils.parentizeAst(
                    NodeFactory.programNode([
                        expectedExpressionStatementNode
                    ])
                );
            });

            it('should clone given AST-tree', () => {
                assert.deepEqual(programNode, expectedProgramNode);
            });
        });
    });

    describe('convertCodeToStructure', () => {
        let structure: TStatement[],
            expectedStructure: TStatement[];

        before(() => {
            const code: string = `
                var abc = 'cde';
            `;

            const identifierNode: ESTree.Identifier = NodeFactory.identifierNode('abc');
            const literalNode: ESTree.Literal = NodeFactory.literalNode('cde');
            const variableDeclaratorNode: ESTree.VariableDeclarator = NodeFactory
                .variableDeclaratorNode(identifierNode, literalNode);
            const variableDeclarationNode: ESTree.VariableDeclaration = NodeFactory
                .variableDeclarationNode([variableDeclaratorNode]);
            const programNode: ESTree.Program = NodeFactory.programNode([variableDeclarationNode]);

            programNode.parentNode = programNode;
            variableDeclarationNode.parentNode = programNode;
            variableDeclaratorNode.parentNode = variableDeclarationNode;
            identifierNode.parentNode = variableDeclaratorNode;
            literalNode.parentNode = variableDeclaratorNode;

            structure = removeRangesFromStructure(
                NodeUtils.convertCodeToStructure(code)
            );
            expectedStructure = [variableDeclarationNode];
        });

        it('should convert code to `ESTree.Node[]` structure array', () => {
            assert.deepEqual(structure, expectedStructure);
        });
    });

    describe('convertStructureToCode', () => {
        let structure: ESTree.Node[],
            expectedCode: string;

        before(() => {
            structure = [
                NodeFactory.programNode([
                    NodeFactory.variableDeclarationNode([
                        NodeFactory.variableDeclaratorNode(
                            NodeFactory.identifierNode('abc'),
                            NodeFactory.literalNode('cde')
                        )
                    ])
                ])
            ];
            expectedCode = 'var abc = \'cde\';';
        });

        it('should convert `ESTree.Node[]` structure to source code', () => {
            assert.deepEqual(NodeUtils.convertStructureToCode(structure), expectedCode);
        });
    });

    describe('getUnaryExpressionArgumentNode', () => {
        let expectedNode: ESTree.Literal,
            unaryExpressionArgumentNode: ESTree.Node;

        before(() => {
            const literalNode: ESTree.Literal = NodeFactory.literalNode('test');
            const unaryExpressionNode2: ESTree.UnaryExpression = NodeFactory.unaryExpressionNode('!', literalNode);
            const unaryExpressionNode1: ESTree.UnaryExpression = NodeFactory.unaryExpressionNode('!', unaryExpressionNode2);
            const expressionStatementNode: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(unaryExpressionNode1);
            const programNode: ESTree.Program = NodeFactory.programNode([
                expressionStatementNode
            ]);

            programNode.parentNode = programNode;
            expressionStatementNode.parentNode = programNode;
            unaryExpressionNode1.parentNode = expressionStatementNode;
            unaryExpressionNode2.parentNode = unaryExpressionNode1;
            literalNode.parentNode = unaryExpressionNode2;

            unaryExpressionArgumentNode = NodeUtils.getUnaryExpressionArgumentNode(unaryExpressionNode1);
            expectedNode = literalNode;
        });

        it('should return unary expression argument node', () => {
            assert.deepEqual(unaryExpressionArgumentNode, expectedNode);
        });
    });

    describe('parentizeAst', () => {
        let ifStatementNode: ESTree.IfStatement,
            ifStatementBlockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            programNode: ESTree.Program;

        beforeEach(() => {
            expressionStatementNode1 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));
            expressionStatementNode2 = NodeFactory.expressionStatementNode(NodeFactory.identifierNode('identifier'));

            ifStatementBlockStatementNode = NodeFactory.blockStatementNode([
                expressionStatementNode1,
                expressionStatementNode2
            ]);

            ifStatementNode = NodeFactory.ifStatementNode(
                NodeFactory.literalNode(true),
                ifStatementBlockStatementNode
            );
        });

        describe('Variant #1: parentize AST-tree with `ProgramNode` as root node', () => {
            beforeEach(() => {
                programNode = NodeFactory.programNode([
                    ifStatementNode
                ]);

                programNode = NodeUtils.parentizeAst(programNode);
            });

            it('should parentize `program` node with `ProgramNode` as root node', () => {
                assert.deepEqual(programNode.parentNode, programNode);
            });

            it('should parentize `ifStatement` node with `ProgramNode` as root node', () => {
                assert.deepEqual(ifStatementNode.parentNode, programNode);
            });

            it('should parentize `ifStatement blockStatement` node with `ProgramNode` as root node', () => {
                assert.deepEqual(ifStatementBlockStatementNode.parentNode, ifStatementNode);
            });

            it('should parentize `expressionStatement` node #1 with `ProgramNode` as root node', () => {
                assert.deepEqual(expressionStatementNode1.parentNode, ifStatementBlockStatementNode);
            });

            it('should parentize `expressionStatement` node #2 with `ProgramNode` as root node', () => {
                assert.deepEqual(expressionStatementNode2.parentNode, ifStatementBlockStatementNode);
            });
        });

        describe('Variant #2: parentize AST-tree', () => {
            beforeEach(() => {
                ifStatementNode = NodeUtils.parentizeAst(ifStatementNode);
            });

            it('should parentize `ifStatement` node', () => {
                assert.deepEqual(ifStatementNode.parentNode, ifStatementNode);
            });

            it('should parentize `ifStatement blockStatement` node', () => {
                assert.deepEqual(ifStatementBlockStatementNode.parentNode, ifStatementNode);
            });

            it('should parentize `expressionStatement` node #1', () => {
                assert.deepEqual(expressionStatementNode1.parentNode, ifStatementBlockStatementNode);
            });

            it('should parentize `expressionStatement` node #2', () => {
                assert.deepEqual(expressionStatementNode2.parentNode, ifStatementBlockStatementNode);
            });
        });
    });

    describe('parentizeNode', () => {
        describe('Variant #1: node with parent node', () => {
            const identifier: ESTree.Identifier = NodeFactory.identifierNode('foo');
            const breakStatement: ESTree.BreakStatement = NodeFactory.breakStatement(identifier);

            const expectedResult: ESTree.Identifier = NodeUtils.clone(identifier);

            let result: ESTree.Identifier;

            before(() => {
                expectedResult.parentNode = breakStatement;

                result = NodeUtils.parentizeNode(identifier, breakStatement);
            });

            it('should parentize given node', () => {
                assert.deepEqual(result, expectedResult);
            });
        });

        describe('Variant #2: node without parent node', () => {
            const identifier: ESTree.Identifier = NodeFactory.identifierNode('Foo');
            const expectedResult: ESTree.Identifier = NodeUtils.clone(identifier);

            let result: ESTree.Identifier;

            before(() => {
                expectedResult.parentNode = expectedResult;

                result = NodeUtils.parentizeNode(identifier, <any>null);
            });

            it('should parentize given node', () => {
                assert.deepEqual(result, expectedResult);
            });
        });
    });
});
