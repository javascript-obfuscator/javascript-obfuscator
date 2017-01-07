import * as ESTree from 'estree';

import { assert } from 'chai';

import { Nodes } from '../../../../src/node/Nodes';
import { NodeUtils } from '../../../../src/node/NodeUtils';

describe('NodeUtils', () => {
    describe('addXVerbatimPropertyToLiterals (node: ESTree.Node): void', () => {
        let literalNode: any,
            expectedLiteralNode: any;

        beforeEach(() => {
            literalNode = Nodes.getLiteralNode('value');
            delete literalNode['x-verbatim-property'];

            expectedLiteralNode = Nodes.getLiteralNode('value');

            NodeUtils.addXVerbatimPropertyToLiterals(literalNode);
        });

        it('should add `x-verbatim-property` to `Literal` node', () => {
            assert.deepEqual(literalNode, expectedLiteralNode);
        });
    });

    describe('convertCodeToStructure (code: string): ESTree.Node[]', () => {
        let code: string,
            identifierNode: ESTree.Identifier,
            literalNode: ESTree.Literal,
            programNode: ESTree.Program,
            variableDeclarationNode: ESTree.VariableDeclaration,
            variableDeclaratorNode: ESTree.VariableDeclarator;

        beforeEach(() => {
            code = `
                var abc = 'cde';
            `;

            identifierNode = Nodes.getIdentifierNode('abc');

            literalNode = Nodes.getLiteralNode('cde');

            variableDeclaratorNode = Nodes.getVariableDeclaratorNode(identifierNode, literalNode);

            variableDeclarationNode = Nodes.getVariableDeclarationNode([
                variableDeclaratorNode
            ]);

            programNode = Nodes.getProgramNode([
                variableDeclarationNode
            ]);

            programNode.parentNode = programNode;
            variableDeclarationNode.parentNode = programNode;
            variableDeclaratorNode.parentNode = variableDeclarationNode;
            identifierNode.parentNode = variableDeclaratorNode;
            literalNode.parentNode = variableDeclaratorNode;
        });

        it('should convert code to `ESTree.Node[]` structure array', () => {
            assert.deepEqual(NodeUtils.convertCodeToStructure(code), [variableDeclarationNode]);
        });
    });

    describe('convertStructureToCode (structure: ESTree.Node[]): string', () => {
        let structure: ESTree.Node[],
            expectedCode: string;

        beforeEach(() => {
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

        beforeEach(() => {
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

        it('should return block-scope node for given node', () => {
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(programNode)[0], programNode);
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(functionDeclarationNode)[0], programNode);
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(functionDeclarationBlockStatementNode)[0], programNode);
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(expressionStatementNode1)[0], functionDeclarationBlockStatementNode);
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(expressionStatementNode1)[1], programNode);
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementNode1)[0], functionDeclarationBlockStatementNode);
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementNode1)[1], programNode);
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode1)[0], functionDeclarationBlockStatementNode);
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode1)[1], programNode);
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode2)[0], functionDeclarationBlockStatementNode);
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(ifStatementBlockStatementNode2)[1], programNode);
            assert.deepEqual(NodeUtils.getBlockScopesOfNode(expressionStatementNode3)[0], functionDeclarationBlockStatementNode);
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

        beforeEach(() => {
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

        it('should return block-scope depth for given node', () => {
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(programNode), 0);
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(functionDeclarationNode1), 0);
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(functionDeclarationBlockStatementNode1), 1);
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(expressionStatementNode1), 1);
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(ifStatementNode1), 1);
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(ifStatementBlockStatementNode1), 1);
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(functionDeclarationNode2), 1);
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(functionDeclarationBlockStatementNode2), 2);
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(expressionStatementNode2), 2);
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(ifStatementNode2), 2);
            assert.deepEqual(NodeUtils.getNodeBlockScopeDepth(ifStatementBlockStatementNode2), 2);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeUtils.getNodeBlockScopeDepth(expressionStatementNode3), ReferenceError);
        });
    });

    describe('getUnaryExpressionArgumentNode (unaryExpressionNode: ESTree.UnaryExpression): ESTree.Node', () => {
        let expressionStatementNode: ESTree.ExpressionStatement,
            literalNode: ESTree.Literal,
            unaryExpressionNode1: ESTree.UnaryExpression,
            unaryExpressionNode2: ESTree.UnaryExpression,
            programNode: ESTree.Program;

        beforeEach(() => {
            literalNode = Nodes.getLiteralNode('test');
            unaryExpressionNode2 = Nodes.getUnaryExpressionNode('!', literalNode)
            unaryExpressionNode1 = Nodes.getUnaryExpressionNode('!', unaryExpressionNode2)
            expressionStatementNode = Nodes.getExpressionStatementNode(unaryExpressionNode1);
            programNode = Nodes.getProgramNode([
                expressionStatementNode
            ]);

            programNode.parentNode = programNode;
            expressionStatementNode.parentNode = programNode;
            unaryExpressionNode1.parentNode = expressionStatementNode;
            unaryExpressionNode2.parentNode = unaryExpressionNode1;
            literalNode.parentNode = unaryExpressionNode2;
        });

        it('should return unary expression argument node', () => {
            assert.deepEqual(NodeUtils.getUnaryExpressionArgumentNode(unaryExpressionNode1), literalNode);
        });
    });

    describe('parentize (node: ESTree.Node): void', () => {
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

        it('should parentize given AST-tree with `ProgramNode` as root node', () => {
            programNode = Nodes.getProgramNode([
                ifStatementNode
            ]);

            programNode = NodeUtils.parentize(programNode);

            assert.deepEqual(programNode.parentNode, programNode);
            assert.deepEqual(ifStatementNode.parentNode, programNode);
            assert.deepEqual(ifStatementBlockStatementNode.parentNode, ifStatementNode);
            assert.deepEqual(expressionStatementNode1.parentNode, ifStatementBlockStatementNode);
            assert.deepEqual(expressionStatementNode2.parentNode, ifStatementBlockStatementNode);
        });

        it('should parentize given AST-tree', () => {
            programNode = Nodes.getProgramNode([
                ifStatementNode
            ]);
            programNode.parentNode = programNode;

            ifStatementNode = NodeUtils.parentize(ifStatementNode);

            assert.deepEqual(ifStatementNode.parentNode, programNode);
            assert.deepEqual(ifStatementBlockStatementNode.parentNode, ifStatementNode);
            assert.deepEqual(expressionStatementNode1.parentNode, ifStatementBlockStatementNode);
            assert.deepEqual(expressionStatementNode2.parentNode, ifStatementBlockStatementNode);
        });
    });
});
