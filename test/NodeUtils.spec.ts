import { IBlockStatementNode } from "../src/interfaces/nodes/IBlockStatementNode";
import { IIdentifierNode } from "../src/interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "../src/interfaces/nodes/ILiteralNode";
import { IProgramNode } from "../src/interfaces/nodes/IProgramNode";

import { NodeType } from "../src/enums/NodeType";

import { NodeUtils } from '../src/NodeUtils';
import {IFunctionDeclarationNode} from "../src/interfaces/nodes/IFunctionDeclarationNode";

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
                type: NodeType.Literal,
                value: 'string',
                raw: `'string'`,
                'x-verbatim-property': `'string'`
            };

            blockStatementNode = {
                type: NodeType.BlockStatement,
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

    describe('getBlockScopeOfNode (node: INode, depth: number = 0): TBlockScopeNode', () => {
        let blockStatementNode: IBlockStatementNode,
            identifierNode: IIdentifierNode,
            functionDeclarationNode: IFunctionDeclarationNode,
            literalNode: ILiteralNode,
            programNode: IProgramNode;

        beforeEach(() => {
            identifierNode = {
                type: NodeType.Identifier,
                name: 'identifier',
            };

            literalNode = {
                type: NodeType.Literal,
                value: 'string',
                raw: `'string'`,
                'x-verbatim-property': `'string'`
            };

            blockStatementNode = {
                type: NodeType.BlockStatement,
                body: [
                    identifierNode,
                    literalNode
                ]
            };

            functionDeclarationNode = {
                type: NodeType.FunctionDeclaration,
                id: {
                    type: NodeType.Identifier,
                    name: 'test'
                },
                params: [],
                body: blockStatementNode,
                generator: false,
                expression: false
            };

            programNode = {
                type: NodeType.Program,
                body: [functionDeclarationNode]
            };

            programNode['parentNode'] = programNode;
            functionDeclarationNode['parentNode'] = programNode;
            blockStatementNode['parentNode'] = functionDeclarationNode;
            identifierNode['parentNode'] = blockStatementNode;
            literalNode['parentNode'] = blockStatementNode;
        });

        it('should return block-scope node for given node', () => {
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(identifierNode), blockStatementNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(identifierNode, 1), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(functionDeclarationNode), programNode);
            assert.deepEqual(NodeUtils.getBlockScopeOfNode(programNode), programNode);
        });
    });

    describe('insertNodeAtIndex (blockScopeBody: INode[], node: INode, index: number): void', () => {
        let blockStatementNode: IBlockStatementNode,
            expectedBlockStatementNode: IBlockStatementNode,
            identifierNode: IIdentifierNode,
            literalNode: ILiteralNode;

        beforeEach(() => {
            identifierNode = {
                type: NodeType.Identifier,
                name: 'identifier'
            };

            literalNode = {
                type: NodeType.Literal,
                value: 'string',
                raw: `'string'`,
                'x-verbatim-property': `'string'`
            };

            blockStatementNode = {
                type: NodeType.BlockStatement,
                body: [
                    identifierNode
                ]
            };

            expectedBlockStatementNode = Object.assign({}, blockStatementNode);
            expectedBlockStatementNode['body'].push(literalNode);

            NodeUtils.insertNodeAtIndex(blockStatementNode.body, literalNode, 1);
        });

        it('should insert given node in block-scope body at index', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });
    });

    describe('parentize (node: INode): void', () => {
        let blockStatementNode: IBlockStatementNode,
            identifierNode: IIdentifierNode,
            literalNode: ILiteralNode,
            programNode: IProgramNode;

        beforeEach(() => {
            identifierNode = {
                type: NodeType.Identifier,
                name: 'identifier'
            };

            literalNode = {
                type: NodeType.Literal,
                value: 'string',
                raw: `'string'`,
                'x-verbatim-property': `'string'`
            };

            blockStatementNode = {
                type: NodeType.BlockStatement,
                body: [
                    identifierNode,
                    literalNode
                ]
            };

            programNode = {
                type: NodeType.Program,
                body: [blockStatementNode]
            };

            NodeUtils.parentize(blockStatementNode);
        });

        it('should parentize given AST-tree', () => {
            assert.deepEqual(blockStatementNode['parentNode'], programNode);
            assert.deepEqual(identifierNode['parentNode'], blockStatementNode);
            assert.deepEqual(literalNode['parentNode'], blockStatementNode);
        });
    });

    describe('prependNode (blockScopeBody: INode[], node: INode): void', () => {
        let blockStatementNode: IBlockStatementNode,
            expectedBlockStatementNode: IBlockStatementNode,
            identifierNode: IIdentifierNode,
            literalNode: ILiteralNode;

        beforeEach(() => {
            identifierNode = {
                type: NodeType.Identifier,
                name: 'identifier'
            };

            literalNode = {
                type: NodeType.Literal,
                value: 'string',
                raw: `'string'`,
                'x-verbatim-property': `'string'`
            };

            blockStatementNode = {
                type: NodeType.Literal,
                body: [identifierNode]
            };

            expectedBlockStatementNode = Object.assign({}, blockStatementNode);
            expectedBlockStatementNode['body'].unshift(literalNode);

            NodeUtils.prependNode(blockStatementNode.body, literalNode)
        });

        it('should prepend given node to a `BlockStatement` node body', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });
    });
});