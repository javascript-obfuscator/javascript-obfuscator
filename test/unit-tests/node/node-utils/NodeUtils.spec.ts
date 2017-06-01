import * as ESTree from 'estree';

import { assert } from 'chai';

import { TStatement } from '../../../../src/types/node/TStatement';

import { Nodes } from '../../../../src/node/Nodes';
import { NodeUtils } from '../../../../src/node/NodeUtils';

describe('NodeUtils', () => {
    describe('addXVerbatimPropertyToLiterals (node: ESTree.Node): void', () => {
        let literalNode: any,
            expectedLiteralNode: any;

        before(() => {
            literalNode = Nodes.getLiteralNode('value');
            delete literalNode['x-verbatim-property'];

            expectedLiteralNode = Nodes.getLiteralNode('value');

            NodeUtils.addXVerbatimPropertyToLiterals(literalNode);
        });

        it('should add `x-verbatim-property` to `Literal` node', () => {
            assert.deepEqual(literalNode, expectedLiteralNode);
        });
    });

    describe('clone <T extends ESTree.Node> (astTree: T): T', () => {
        let programNode: ESTree.Program,
            expectedProgramNode: ESTree.Program;

        before(() => {
            // actual AST tree
            const expressionStatementNode1: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            const expressionStatementNode2: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));

            const ifStatementBlockStatementNode1: ESTree.BlockStatement = Nodes.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode2
            ]);

            const ifStatementNode1: ESTree.IfStatement = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode1
            );

            // expected AST tree
            const expressionStatementNode3: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            const expressionStatementNode4: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));

            const ifStatementBlockStatementNode2: ESTree.BlockStatement = Nodes.getBlockStatementNode([
                expressionStatementNode3,
                expressionStatementNode4
            ]);

            const ifStatementNode2: ESTree.IfStatement = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode2
            );

            programNode = NodeUtils.clone(
                Nodes.getProgramNode([
                    ifStatementNode1
                ])
            );
            expectedProgramNode = NodeUtils.parentize(
                Nodes.getProgramNode([
                    ifStatementNode2
                ])
            );
        });

        it('should clone given AST-tree', () => {
            assert.deepEqual(programNode, expectedProgramNode);
        });
    });

    describe('convertCodeToStructure (code: string): ESTree.Node[]', () => {
        let structure: TStatement[],
            expectedStructure: TStatement[];

        before(() => {
            const code: string = `
                var abc = 'cde';
            `;

            const identifierNode: ESTree.Identifier = Nodes.getIdentifierNode('abc');
            const literalNode: ESTree.Literal = Nodes.getLiteralNode('cde');
            const variableDeclaratorNode: ESTree.VariableDeclarator = Nodes.getVariableDeclaratorNode(identifierNode, literalNode);
            const variableDeclarationNode: ESTree.VariableDeclaration = Nodes.getVariableDeclarationNode([
                variableDeclaratorNode
            ]);
            const programNode: ESTree.Program = Nodes.getProgramNode([
                variableDeclarationNode
            ]);

            programNode.parentNode = programNode;
            variableDeclarationNode.parentNode = programNode;
            variableDeclaratorNode.parentNode = variableDeclarationNode;
            identifierNode.parentNode = variableDeclaratorNode;
            literalNode.parentNode = variableDeclaratorNode;

            structure = NodeUtils.convertCodeToStructure(code);
            expectedStructure = [variableDeclarationNode];
        });

        it('should convert code to `ESTree.Node[]` structure array', () => {
            assert.deepEqual(structure, expectedStructure);
        });
    });

    describe('convertStructureToCode (structure: ESTree.Node[]): string', () => {
        let structure: ESTree.Node[],
            expectedCode: string;

        before(() => {
            structure = [
                Nodes.getProgramNode([
                    Nodes.getVariableDeclarationNode([
                        Nodes.getVariableDeclaratorNode(
                            Nodes.getIdentifierNode('abc'),
                            Nodes.getLiteralNode('cde')
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

    describe('getBlockStatementNodeByIndex (node: ESTree.Node, index: number = 0): ESTree.Node', () => {
        let blockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement;

        beforeEach(() => {
            expressionStatementNode1 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            expressionStatementNode2 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));

            blockStatementNode = Nodes.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode2
            ]);
        });

        it('should return block-statement child node of given node if that node has block-statement', () => {
            assert.deepEqual(NodeUtils.getBlockStatementNodeByIndex(blockStatementNode), expressionStatementNode1);
        });

        it('should return block-statement child node of given node with index `1` if that node has block-statement', () => {
            assert.deepEqual(NodeUtils.getBlockStatementNodeByIndex(blockStatementNode, 1), expressionStatementNode2);
        });

        it('should throw a `ReferenceError` if index is out of boundaries', () => {
            assert.throws(() => NodeUtils.getBlockStatementNodeByIndex(blockStatementNode, 2), ReferenceError);
        });

        it('should throw a `TypeError` if node have no a block-statement', () => {
            assert.throws(() => NodeUtils.getBlockStatementNodeByIndex(expressionStatementNode1, 1), TypeError);
        });
    });

    describe('getBlockScopesOfNode (node: ESTree.Node, blockScopes: TNodeWithBlockStatement[] = []): TNodeWithBlockStatement[]', () => {
        let functionDeclarationBlockStatementNode: ESTree.BlockStatement,
            ifStatementBlockStatementNode1: ESTree.BlockStatement,
            ifStatementBlockStatementNode2: ESTree.BlockStatement,
            ifStatementNode1: ESTree.IfStatement,
            ifStatementNode2: ESTree.IfStatement,
            expressionStatementNode3: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            functionDeclarationNode: ESTree.FunctionDeclaration,
            programNode: ESTree.Program;

        before(() => {
            expressionStatementNode1 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            expressionStatementNode2 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            expressionStatementNode3 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));

            ifStatementBlockStatementNode2 = Nodes.getBlockStatementNode([
                expressionStatementNode2,
                expressionStatementNode3
            ]);

            ifStatementNode2 = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode2
            );

            ifStatementBlockStatementNode1 = Nodes.getBlockStatementNode([
                ifStatementNode2
            ]);

            ifStatementNode1 = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode1
            );

            functionDeclarationBlockStatementNode = Nodes.getBlockStatementNode([
                expressionStatementNode1,
                ifStatementNode1
            ]);

            functionDeclarationNode = Nodes.getFunctionDeclarationNode('test', [], functionDeclarationBlockStatementNode);

            programNode = Nodes.getProgramNode([
                functionDeclarationNode
            ]);

            programNode.parentNode = programNode;
            functionDeclarationNode.parentNode = programNode;
            functionDeclarationBlockStatementNode.parentNode = functionDeclarationNode;
            expressionStatementNode1.parentNode = functionDeclarationBlockStatementNode;
            ifStatementNode1.parentNode = functionDeclarationBlockStatementNode;
            ifStatementBlockStatementNode1.parentNode = ifStatementNode1;
            ifStatementNode2.parentNode = ifStatementBlockStatementNode1;
            ifStatementBlockStatementNode2.parentNode = ifStatementNode2;
            expressionStatementNode3.parentNode = ifStatementBlockStatementNode2;
        });

        it('should return block-scope node for `program` node child', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(programNode)[0], programNode);
        });

        it('should return block-scope node for `functionDeclaration` node child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(functionDeclarationNode)[0], programNode);
        });

        it('should return block-scope node for `functionDeclaration blockStatement` node child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(functionDeclarationBlockStatementNode)[0], programNode);
        });

        it('should return block-scope node for `expressionStatement` node #1 child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(expressionStatementNode1)[0], functionDeclarationBlockStatementNode);
        });

        it('should return block-scope node for `expressionStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(expressionStatementNode1)[1], programNode);
        });

        it('should return block-scope node for `ifStatement` node child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementNode1)[0], functionDeclarationBlockStatementNode);
        });

        it('should return block-scope node for `ifStatement` node child node #2', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementNode1)[1], programNode);
        });

        it('should return block-scope node for `ifStatement blockStatement` node #1 child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode1)[0], functionDeclarationBlockStatementNode);
        });

        it('should return block-scope node for `ifStatement blockStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode1)[1], programNode);
        });

        it('should return block-scope node for `ifStatement blockStatement` node #2 child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode2)[0], functionDeclarationBlockStatementNode);
        });

        it('should return block-scope node for `ifStatement blockStatement` node #1 child node #2', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode2)[1], programNode);
        });

        it('should return block-scope node for `expressionStatement` node #3 child node #1', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(expressionStatementNode3)[0], functionDeclarationBlockStatementNode);
        });

        it('should return block-scope node for `expressionStatement` node #3 child node #2', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(expressionStatementNode3)[1], programNode);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeUtils.getBlockScopesOfNode(expressionStatementNode2)[0], ReferenceError);
        });
    });

    describe('getNodeBlockScopeDepth (node: ESTree.Node, depth: number = 0): number', () => {
        let functionDeclarationBlockStatementNode1: ESTree.BlockStatement,
            functionDeclarationBlockStatementNode2: ESTree.BlockStatement,
            ifStatementBlockStatementNode1: ESTree.BlockStatement,
            ifStatementBlockStatementNode2: ESTree.BlockStatement,
            ifStatementNode1: ESTree.IfStatement,
            ifStatementNode2: ESTree.IfStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            expressionStatementNode3: ESTree.ExpressionStatement,
            functionDeclarationNode1: ESTree.FunctionDeclaration,
            functionDeclarationNode2: ESTree.FunctionDeclaration,
            programNode: ESTree.Program;

        before(() => {
            expressionStatementNode1 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            expressionStatementNode2 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            expressionStatementNode3 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));

            ifStatementBlockStatementNode2 = Nodes.getBlockStatementNode([
                expressionStatementNode3
            ]);

            ifStatementNode2 = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode2
            );

            functionDeclarationBlockStatementNode2 = Nodes.getBlockStatementNode([
                ifStatementNode2,
                expressionStatementNode2
            ]);

            functionDeclarationNode2 = Nodes.getFunctionDeclarationNode('test', [], functionDeclarationBlockStatementNode2);

            ifStatementBlockStatementNode1 = Nodes.getBlockStatementNode([
                functionDeclarationNode2
            ]);

            ifStatementNode1 = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode1
            );

            functionDeclarationBlockStatementNode1 = Nodes.getBlockStatementNode([
                expressionStatementNode1,
                ifStatementNode1
            ]);

            functionDeclarationNode1 = Nodes.getFunctionDeclarationNode('test', [], functionDeclarationBlockStatementNode1);

            programNode = Nodes.getProgramNode([
                functionDeclarationNode1
            ]);

            programNode.parentNode = programNode;
            functionDeclarationNode1.parentNode = programNode;
            functionDeclarationBlockStatementNode1.parentNode = functionDeclarationNode1;
            expressionStatementNode1.parentNode = functionDeclarationBlockStatementNode1;
            ifStatementNode1.parentNode = functionDeclarationBlockStatementNode1;
            ifStatementBlockStatementNode1.parentNode = ifStatementNode1;
            functionDeclarationNode2.parentNode = ifStatementBlockStatementNode1;
            functionDeclarationBlockStatementNode2.parentNode = functionDeclarationNode2;
            expressionStatementNode2.parentNode = functionDeclarationBlockStatementNode2;
            ifStatementNode2.parentNode = functionDeclarationBlockStatementNode2;
            ifStatementBlockStatementNode2.parentNode = ifStatementNode2;
        });

        it('should return block-scope depth for `program` node', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(programNode), 0);
        });

        it('should return block-scope depth for `functionDeclaration` node #1', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(functionDeclarationNode1), 0);
        });

        it('should return block-scope depth for `functionDeclaration blockStatement` node #1', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(functionDeclarationBlockStatementNode1), 1);
        });

        it('should return block-scope depth for `expressionStatement` node #1', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(expressionStatementNode1), 1);
        });

        it('should return block-scope depth for `ifStatement` node #1', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(ifStatementNode1), 1);
        });

        it('should return block-scope depth for `ifStatement blockStatement` node #1', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(ifStatementBlockStatementNode1), 1);
        });

        it('should return block-scope depth for `functionDeclaration` node #2', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(functionDeclarationNode2), 1);
        });

        it('should return block-scope depth for `functionDeclaration blockStatement` node #2', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(functionDeclarationBlockStatementNode2), 2);
        });

        it('should return block-scope depth for `expressionStatement` node #2', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(expressionStatementNode2), 2);
        });

        it('should return block-scope depth for `ifStatement` node #2', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(ifStatementNode2), 2);
        });

        it('should return block-scope depth for `ifStatement blockStatement` node #2', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(ifStatementBlockStatementNode2), 2);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeUtils.getNodeBlockScopeDepth(expressionStatementNode3), ReferenceError);
        });
    });

    describe('getUnaryExpressionArgumentNode (unaryExpressionNode: ESTree.UnaryExpression): ESTree.Node', () => {
        let expectedNode: ESTree.Literal,
            unaryExpressionArgumentNode: ESTree.Node;

        before(() => {
            const literalNode: ESTree.Literal = Nodes.getLiteralNode('test');
            const unaryExpressionNode2: ESTree.UnaryExpression = Nodes.getUnaryExpressionNode('!', literalNode);
            const unaryExpressionNode1: ESTree.UnaryExpression = Nodes.getUnaryExpressionNode('!', unaryExpressionNode2);
            const expressionStatementNode: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(unaryExpressionNode1);
            const programNode: ESTree.Program = Nodes.getProgramNode([
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

    describe('parentize <T extends ESTree.Node> (astTree: T): T', () => {
        let ifStatementNode: ESTree.IfStatement,
            ifStatementBlockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            programNode: ESTree.Program;

        beforeEach(() => {
            expressionStatementNode1 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));
            expressionStatementNode2 = Nodes.getExpressionStatementNode(Nodes.getIdentifierNode('identifier'));

            ifStatementBlockStatementNode = Nodes.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode2
            ]);

            ifStatementNode = Nodes.getIfStatementNode(
                Nodes.getLiteralNode(true),
                ifStatementBlockStatementNode
            );
        });

        describe('parentize AST-tree with `ProgramNode` as root node', () => {
            beforeEach(() => {
                programNode = Nodes.getProgramNode([
                    ifStatementNode
                ]);

                programNode = NodeUtils.parentize(programNode);
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

        describe('parentize AST-tree', () => {
            beforeEach(() => {
                programNode = Nodes.getProgramNode([
                    ifStatementNode
                ]);
                programNode.parentNode = programNode;

                ifStatementNode = NodeUtils.parentize(ifStatementNode);
            });

            it('should parentize `ifStatement` node', () => {
                assert.deepEqual(ifStatementNode.parentNode, programNode);
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
});
