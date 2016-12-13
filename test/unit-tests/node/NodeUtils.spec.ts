import * as ESTree from 'estree';

import { assert } from 'chai';

import { NodeMocks } from '../../mocks/NodeMocks';
import { NodeUtils } from '../../../src/node/NodeUtils';

describe('NodeUtils', () => {
    describe('addXVerbatimPropertyToLiterals (node: ESTree.Node): void', () => {
        let literalNode: any,
            expectedLiteralNode: any;

        beforeEach(() => {
            literalNode = NodeMocks.getLiteralNode();
            delete literalNode['x-verbatim-property'];

            expectedLiteralNode = NodeMocks.getLiteralNode();

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

            identifierNode = NodeMocks.getIdentifierNode('abc');

            literalNode = NodeMocks.getLiteralNode('cde');

            variableDeclaratorNode = NodeMocks.getVariableDeclaratorNode(identifierNode, literalNode);

            variableDeclarationNode = NodeMocks.getVariableDeclarationNode([
                variableDeclaratorNode
            ]);

            programNode = NodeMocks.getProgramNode([
                variableDeclarationNode
            ]);

            programNode['parentNode'] = programNode;
            variableDeclarationNode['parentNode'] = programNode;
            variableDeclaratorNode['parentNode'] = variableDeclarationNode;
            identifierNode['parentNode'] = variableDeclaratorNode;
            literalNode['parentNode'] = variableDeclaratorNode;
        });

        it('should convert code to `ESTree.Node[]` structure array', () => {
            assert.deepEqual(NodeUtils.convertCodeToStructure(code), [variableDeclarationNode]);
        });
    });

    describe('getBlockStatementNodeByIndex (node: ESTree.Node, index: number = 0): ESTree.Node', () => {
        let blockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement;

        beforeEach(() => {
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode();
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode();

            blockStatementNode = NodeMocks.getBlockStatementNode([
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

    describe('getBlockScopeOfNode (node: ESTree.Node, depth: number = 0): TNodeWithBlockStatement', () => {
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
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode();
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode();
            expressionStatementNode3 = NodeMocks.getExpressionStatementNode();

            ifStatementBlockStatementNode2 = NodeMocks.getBlockStatementNode([
                expressionStatementNode2,
                expressionStatementNode3
            ]);

            ifStatementNode2 = NodeMocks.getIfStatementNode(ifStatementBlockStatementNode2);

            ifStatementBlockStatementNode1 = NodeMocks.getBlockStatementNode([
                ifStatementNode2
            ]);

            ifStatementNode1 = NodeMocks.getIfStatementNode(ifStatementBlockStatementNode1);

            functionDeclarationBlockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1,
                ifStatementNode1
            ]);

            functionDeclarationNode = NodeMocks.getFunctionDeclarationNode('test', functionDeclarationBlockStatementNode);

            programNode = NodeMocks.getProgramNode([
                functionDeclarationNode
            ]);

            programNode['parentNode'] = programNode;
            functionDeclarationNode['parentNode'] = programNode;
            functionDeclarationBlockStatementNode['parentNode'] = functionDeclarationNode;
            expressionStatementNode1['parentNode'] = functionDeclarationBlockStatementNode;
            ifStatementNode1['parentNode'] = functionDeclarationBlockStatementNode;
            ifStatementBlockStatementNode1['parentNode'] = ifStatementNode1;
            ifStatementNode2['parentNode'] = ifStatementBlockStatementNode1;
            ifStatementBlockStatementNode2['parentNode'] = ifStatementNode2;
            expressionStatementNode3['parentNode'] = ifStatementBlockStatementNode2;
        });

        it('should return block-scope node for given node', () => {
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(programNode), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(functionDeclarationNode), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(functionDeclarationBlockStatementNode), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(expressionStatementNode1), functionDeclarationBlockStatementNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(expressionStatementNode1, 1), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(expressionStatementNode1, 10), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(ifStatementNode1), functionDeclarationBlockStatementNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(ifStatementNode1, 1), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(ifStatementBlockStatementNode1), functionDeclarationBlockStatementNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(ifStatementBlockStatementNode1, 1), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(ifStatementBlockStatementNode2), functionDeclarationBlockStatementNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(ifStatementBlockStatementNode2, 1), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(expressionStatementNode3), functionDeclarationBlockStatementNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(expressionStatementNode3, 1), programNode);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeUtils.getBlockScopeOfNode(expressionStatementNode2), ReferenceError);
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
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode();
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode();
            expressionStatementNode3 = NodeMocks.getExpressionStatementNode();

            ifStatementBlockStatementNode2 = NodeMocks.getBlockStatementNode([
                expressionStatementNode3
            ]);

            ifStatementNode2 = NodeMocks.getIfStatementNode(ifStatementBlockStatementNode2);

            functionDeclarationBlockStatementNode2 = NodeMocks.getBlockStatementNode([
                ifStatementNode2,
                expressionStatementNode2
            ]);

            functionDeclarationNode2 = NodeMocks.getFunctionDeclarationNode('test', functionDeclarationBlockStatementNode2);

            ifStatementBlockStatementNode1 = NodeMocks.getBlockStatementNode([
                functionDeclarationNode2
            ]);

            ifStatementNode1 = NodeMocks.getIfStatementNode(ifStatementBlockStatementNode1);

            functionDeclarationBlockStatementNode1 = NodeMocks.getBlockStatementNode([
                expressionStatementNode1,
                ifStatementNode1
            ]);

            functionDeclarationNode1 = NodeMocks.getFunctionDeclarationNode('test', functionDeclarationBlockStatementNode1);

            programNode = NodeMocks.getProgramNode([
                functionDeclarationNode1
            ]);

            programNode['parentNode'] = programNode;
            functionDeclarationNode1['parentNode'] = programNode;
            functionDeclarationBlockStatementNode1['parentNode'] = functionDeclarationNode1;
            expressionStatementNode1['parentNode'] = functionDeclarationBlockStatementNode1;
            ifStatementNode1['parentNode'] = functionDeclarationBlockStatementNode1;
            ifStatementBlockStatementNode1['parentNode'] = ifStatementNode1;
            functionDeclarationNode2['parentNode'] = ifStatementBlockStatementNode1;
            functionDeclarationBlockStatementNode2['parentNode'] = functionDeclarationNode2;
            expressionStatementNode2['parentNode'] = functionDeclarationBlockStatementNode2;
            ifStatementNode2['parentNode'] = functionDeclarationBlockStatementNode2;
            ifStatementBlockStatementNode2['parentNode'] = ifStatementNode2;
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

    describe('parentize (node: ESTree.Node): void', () => {
        let ifStatementNode: ESTree.IfStatement,
            ifStatementBlockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            programNode: ESTree.Program;

        beforeEach(() => {
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode();
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode();

            ifStatementBlockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode2
            ]);

            ifStatementNode = NodeMocks.getIfStatementNode(ifStatementBlockStatementNode);
        });

        it('should parentize given AST-tree with `ProgramNode` as root node', () => {
            programNode = NodeMocks.getProgramNode([
                ifStatementNode
            ]);

            NodeUtils.parentize(programNode);

            assert.deepEqual(programNode['parentNode'], programNode);
            assert.deepEqual(ifStatementNode['parentNode'], programNode);
            assert.deepEqual(ifStatementBlockStatementNode['parentNode'], ifStatementNode);
            assert.deepEqual(expressionStatementNode1['parentNode'], ifStatementBlockStatementNode);
            assert.deepEqual(expressionStatementNode2['parentNode'], ifStatementBlockStatementNode);
        });

        it('should parentize given AST-tree', () => {
            programNode = NodeMocks.getProgramNode([
                ifStatementNode
            ]);
            programNode['parentNode'] = programNode;

            NodeUtils.parentize(ifStatementNode);

            assert.deepEqual(ifStatementNode['parentNode'], programNode);
            assert.deepEqual(ifStatementBlockStatementNode['parentNode'], ifStatementNode);
            assert.deepEqual(expressionStatementNode1['parentNode'], ifStatementBlockStatementNode);
            assert.deepEqual(expressionStatementNode2['parentNode'], ifStatementBlockStatementNode);
        });
    });
});
