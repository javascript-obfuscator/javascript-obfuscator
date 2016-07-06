import { IBlockStatementNode } from "../src/interfaces/nodes/IBlockStatementNode";
import { IExpressionStatementNode } from "../src/interfaces/nodes/IExpressionStatementNode";
import { IFunctionDeclarationNode } from "../src/interfaces/nodes/IFunctionDeclarationNode";
import { IIfStatementNode } from "../src/interfaces/nodes/IIfStatementNode";
import { INode } from "../src/interfaces/nodes/INode";
import { IProgramNode } from "../src/interfaces/nodes/IProgramNode";

import { NodeMocks } from './mocks/NodeMocks';
import { NodeUtils } from '../src/NodeUtils';

const assert: any = require('chai').assert;

describe('NodeUtils', () => {
    describe('addXVerbatimPropertyToLiterals (node: INode): void', () => {
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

    describe('appendNode (blockScopeBody: INode[], node: INode): void', () => {
        let blockStatementNode: IBlockStatementNode,
            expectedBlockStatementNode: IBlockStatementNode,
            expressionStatementNode: IExpressionStatementNode;

        beforeEach(() => {
            expressionStatementNode = NodeMocks.getExpressionStatementNode();

            blockStatementNode = NodeMocks.getBlockStatementNode();

            expectedBlockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode
            ]);

            NodeUtils.appendNode(blockStatementNode.body, expressionStatementNode);
        });

        it('should append given node to a `BlockStatement` node body', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });

        it('should does not change `BlockStatement` node body if given node is not a valid Node', () => {
            assert.doesNotChange(
                () => NodeUtils.appendNode(blockStatementNode.body, <INode>null),
                blockStatementNode,
                'body'
            );

            assert.doesNotChange(
                () => NodeUtils.appendNode(blockStatementNode.body, <INode>{}),
                blockStatementNode,
                'body'
            );
        });
    });

    describe('getBlockStatementNodeByIndex (node: INode, index: number = 0): INode', () => {
        let blockStatementNode: IBlockStatementNode,
            expressionStatementNode1: IExpressionStatementNode,
            expressionStatementNode2: IExpressionStatementNode;

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

    describe('getBlockScopeOfNode (node: INode, depth: number = 0): TNodeWithBlockStatement', () => {
        let functionDeclarationBlockStatementNode: IBlockStatementNode,
            ifStatementBlockStatementNode1: IBlockStatementNode,
            ifStatementBlockStatementNode2: IBlockStatementNode,
            ifStatementNode1: IIfStatementNode,
            ifStatementNode2: IIfStatementNode,
            expressionStatementNode1: IExpressionStatementNode,
            expressionStatementNode2: IExpressionStatementNode,
            expressionStatementNode3: IExpressionStatementNode,
            functionDeclarationNode: IFunctionDeclarationNode,
            programNode: IProgramNode;

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

    describe('insertNodeAtIndex (blockScopeBody: INode[], node: INode, index: number): void', () => {
        let blockStatementNode: IBlockStatementNode,
            expectedBlockStatementNode: IBlockStatementNode,
            expressionStatementNode1: IExpressionStatementNode,
            expressionStatementNode2: IExpressionStatementNode;

        beforeEach(() => {
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode();
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode();

            blockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1
            ]);

            expectedBlockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode1
            ]);

            NodeUtils.insertNodeAtIndex(blockStatementNode.body, expressionStatementNode2, 1);
        });

        it('should insert given node in `BlockStatement` node body at index', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });

        it('should does not change `BlockStatement` node body if given node is not a valid Node', () => {
            assert.doesNotChange(
                () => NodeUtils.insertNodeAtIndex(blockStatementNode.body, <INode>null, 1),
                blockStatementNode,
                'body'
            );

            assert.doesNotChange(
                () => NodeUtils.insertNodeAtIndex(blockStatementNode.body, <INode>{}, 1),
                blockStatementNode,
                'body'
            );
        });
    });

    describe('parentize (node: INode): void', () => {
        let ifStatementNode: IIfStatementNode,
            ifStatementBlockStatementNode: IBlockStatementNode,
            expressionStatementNode1: IExpressionStatementNode,
            expressionStatementNode2: IExpressionStatementNode,
            programNode: IProgramNode;

        beforeEach(() => {
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode();
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode();

            ifStatementBlockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode2
            ]);

            ifStatementNode = NodeMocks.getIfStatementNode(ifStatementBlockStatementNode);

            programNode = NodeMocks.getProgramNode([
                ifStatementNode
            ]);

            NodeUtils.parentize(ifStatementNode);
        });

        it('should parentize given AST-tree', () => {
            assert.deepEqual(ifStatementNode['parentNode'], programNode);
            assert.deepEqual(ifStatementBlockStatementNode['parentNode'], ifStatementNode);
            assert.deepEqual(expressionStatementNode1['parentNode'], ifStatementBlockStatementNode);
            assert.deepEqual(expressionStatementNode2['parentNode'], ifStatementBlockStatementNode);
        });
    });

    describe('prependNode (blockScopeBody: INode[], node: INode): void', () => {
        let blockStatementNode: IBlockStatementNode,
            expectedBlockStatementNode: IBlockStatementNode,
            expressionStatementNode1: IExpressionStatementNode,
            expressionStatementNode2: IExpressionStatementNode;

        beforeEach(() => {
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode();
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode();

            blockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1
            ]);

            expectedBlockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode2,
                expressionStatementNode1
            ]);

            NodeUtils.prependNode(blockStatementNode.body, expressionStatementNode2);
        });

        it('should prepend given node to a `BlockStatement` node body', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });

        it('should does not change `BlockStatement` node body if given node is not a valid Node', () => {
            assert.doesNotChange(
                () => NodeUtils.prependNode(blockStatementNode.body, <INode>null),
                blockStatementNode,
                'body'
            );

            assert.doesNotChange(
                () => NodeUtils.prependNode(blockStatementNode.body, <INode>{}),
                blockStatementNode,
                'body'
            );
        });
    });
});
