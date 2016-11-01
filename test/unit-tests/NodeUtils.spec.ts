import * as chai from 'chai';
import * as ESTree from 'estree';

import { TStatement } from '../../src/types/TStatement';

import { NodeMocks } from '../mocks/NodeMocks';
import { NodeUtils } from '../../src/NodeUtils';

const assert: any = chai.assert;

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

    describe('appendNode (blockScopeNode: TNodeWithBlockStatement[], nodeBodyStatements: TStatement[]): void', () => {
        let blockStatementNode: ESTree.BlockStatement,
            expectedBlockStatementNode: ESTree.BlockStatement,
            expectedExpressionStatementNode: ESTree.ExpressionStatement,
            expressionStatementNode: ESTree.ExpressionStatement;

        beforeEach(() => {
            expressionStatementNode = NodeMocks.getExpressionStatementNode();
            expectedExpressionStatementNode = NodeMocks.getExpressionStatementNode();

            blockStatementNode = NodeMocks.getBlockStatementNode();

            expectedExpressionStatementNode['parentNode'] = blockStatementNode;

            expectedBlockStatementNode = NodeMocks.getBlockStatementNode([
                expectedExpressionStatementNode
            ]);

            NodeUtils.appendNode(
                blockStatementNode,
                [expressionStatementNode]
            );
            NodeUtils.appendNode(
                blockStatementNode,
                <TStatement[]>[{}]
            );
        });

        it('should appendNode given node to a `BlockStatement` node body', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });

        it('should does not change `BlockStatement` node body if given node is not a valid Node', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
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
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            expressionStatementNode3: ESTree.ExpressionStatement,
            functionDeclarationNode: ESTree.FunctionDeclaration,
            programNode: ESTree.Program;

        beforeEach(() => {
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode();
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode();
            expressionStatementNode3 = NodeMocks.getExpressionStatementNode();

            ifStatementBlockStatementNode2 = NodeMocks.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode2
            ]);

            ifStatementNode2 = NodeMocks.getIfStatementNode(ifStatementBlockStatementNode2);

            ifStatementBlockStatementNode1 = NodeMocks.getBlockStatementNode([
                ifStatementNode2
            ]);

            ifStatementNode1 = NodeMocks.getIfStatementNode(ifStatementBlockStatementNode1);

            functionDeclarationBlockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode3,
                ifStatementNode1
            ]);

            functionDeclarationNode = NodeMocks.getFunctionDeclarationNode('test', functionDeclarationBlockStatementNode);

            programNode = NodeMocks.getProgramNode([
                functionDeclarationNode
            ]);

            programNode['parentNode'] = programNode;
            functionDeclarationNode['parentNode'] = programNode;
            functionDeclarationBlockStatementNode['parentNode'] = functionDeclarationNode;
            expressionStatementNode3['parentNode'] = functionDeclarationBlockStatementNode;
            ifStatementNode1['parentNode'] = functionDeclarationBlockStatementNode;
            ifStatementBlockStatementNode1['parentNode'] = ifStatementNode1;
            ifStatementNode2['parentNode'] = ifStatementBlockStatementNode1;
            ifStatementBlockStatementNode2['parentNode'] = ifStatementNode2;
            expressionStatementNode1['parentNode'] = ifStatementBlockStatementNode2;
        });

        it('should return block-scope node for given node', () => {
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(expressionStatementNode3), functionDeclarationBlockStatementNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(expressionStatementNode3, 1), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(functionDeclarationNode), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(functionDeclarationBlockStatementNode), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(programNode), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(expressionStatementNode1), functionDeclarationBlockStatementNode);
        });

        it('should throw a `ReferenceError` if node has no `parentNode` property', () => {
            assert.throws(() => NodeUtils.getBlockScopeOfNode(expressionStatementNode2), ReferenceError);
        });
    });

    describe('insertNodeAtIndex (blockScopeNode: TNodeWithBlockStatement[], nodeBodyStatements: TStatement[], index: number): void', () => {
        let blockStatementNode: ESTree.BlockStatement,
            expectedBlockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            expressionStatementNode3: ESTree.ExpressionStatement,
            expressionStatementNode4: ESTree.ExpressionStatement;

        beforeEach(() => {
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(1));
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(2));
            expressionStatementNode3 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(3));
            expressionStatementNode4 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(2));

            blockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode3
            ]);

            expressionStatementNode1['parentNode'] = blockStatementNode;
            expressionStatementNode2['parentNode'] = blockStatementNode;
            expressionStatementNode3['parentNode'] = blockStatementNode;

            expectedBlockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode2,
                expressionStatementNode3
            ]);

            NodeUtils.insertNodeAtIndex(
                blockStatementNode,
                [expressionStatementNode4],
                1
            );
            NodeUtils.insertNodeAtIndex(
                blockStatementNode,
                <TStatement[]>[{}],
                1
            );
        });

        it('should insert given node in `BlockStatement` node body at index', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });

        it('should does not change `BlockStatement` node body if given node is not a valid Node', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
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

    describe('prependNode (blockScopeNode: TNodeWithBlockStatement[], nodeBodyStatements: TStatement[]): void', () => {
        let blockStatementNode: ESTree.BlockStatement,
            expectedBlockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            expressionStatementNode3: ESTree.ExpressionStatement;

        beforeEach(() => {
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(1));
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(2));
            expressionStatementNode3 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(2));

            blockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1
            ]);

            expressionStatementNode1['parentNode'] = blockStatementNode;
            expressionStatementNode2['parentNode'] = blockStatementNode;

            expectedBlockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode2,
                expressionStatementNode1
            ]);

            NodeUtils.prependNode(
                blockStatementNode,
                [Object.assign({}, expressionStatementNode3)]
            );
            NodeUtils.prependNode(
                blockStatementNode,
                <TStatement[]>[{}]
            )
        });

        it('should prepend given node to a `BlockStatement` node body', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });

        it('should does not change `BlockStatement` node body if given node is not a valid Node', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });
    });
});
