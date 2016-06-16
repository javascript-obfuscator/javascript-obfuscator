import { IBlockStatementNode } from "../src/interfaces/nodes/IBlockStatementNode";
import { IIdentifierNode } from "../src/interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "../src/interfaces/nodes/ILiteralNode";

import { NodeType } from "../src/enums/NodeType";

import { NodeUtils } from '../src/NodeUtils';

let assert: any = require('chai').assert;

describe('NodeUtils', () => {
    describe('addXVerbatimPropertyToLiterals (node: INode): void', () => {
        let node: any;

        beforeEach(() => {
            node = {
                type: NodeType.Literal,
                value: 'string',
                raw: `'string'`
            };

            NodeUtils.addXVerbatimPropertyToLiterals(node)
        });

        it('should add `x-verbatim-property` to `Literal` node', () => {
            assert.deepEqual(node, {
                type: NodeType.Literal,
                value: 'string',
                raw: `'string'`,
                'x-verbatim-property': `'string'`
            });
        });
    });

    describe('appendNode (blockScopeBody: INode[], node: INode): void', () => {
        let blockStatementNode: IBlockStatementNode,
            identifierNode: IIdentifierNode;

        beforeEach(() => {
            blockStatementNode = {
                type: NodeType.Literal,
                body: []
            };

            identifierNode = {
                type: NodeType.Identifier,
                name: 'identifier'
            };

            NodeUtils.appendNode(blockStatementNode.body, identifierNode)
        });

        it('should append given node to a `BlockStatement` node body', () => {
            assert.deepEqual(blockStatementNode, {
                type: NodeType.Literal,
                body: [identifierNode]
            });
        });
    });

    describe('getBlockScopeNodeByIndex (node: INode, index: number = 0): INode', () => {
        let blockStatementNode: IBlockStatementNode,
            identifierNode: IIdentifierNode,
            literalNode: ILiteralNode;

        beforeEach(() => {
            identifierNode = {
                type: NodeType.Identifier,
                name: 'identifier'
            };

            literalNode = {
                type: NodeType.Identifier,
                value: 'string',
                raw: `'string'`,
                'x-verbatim-property': `'string'`
            };

            blockStatementNode = {
                type: NodeType.Literal,
                body: [
                    identifierNode,
                    literalNode
                ]
            };
        });

        it('should return block-scope node of given node by given index if node has block-scope', () => {
            assert.deepEqual(NodeUtils.getBlockScopeNodeByIndex(blockStatementNode), identifierNode);
            assert.deepEqual(NodeUtils.getBlockScopeNodeByIndex(blockStatementNode, 1), literalNode);
        });

        it('should return root node if index is out of boundaries', () => {
            assert.deepEqual(NodeUtils.getBlockScopeNodeByIndex(blockStatementNode, 2), blockStatementNode);
        });

        it('should return root node if node has not block-scope', () => {
            assert.deepEqual(NodeUtils.getBlockScopeNodeByIndex(identifierNode, 1), identifierNode);
        });
    });
});