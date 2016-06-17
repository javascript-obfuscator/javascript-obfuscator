import { IBlockStatementNode } from "../src/interfaces/nodes/IBlockStatementNode";
import { IFunctionDeclarationNode } from "../src/interfaces/nodes/IFunctionDeclarationNode";
import { IIdentifierNode } from "../src/interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "../src/interfaces/nodes/ILiteralNode";
import { INode } from "../src/interfaces/nodes/INode";
import { IProgramNode } from "../src/interfaces/nodes/IProgramNode";

import { NodeType } from "../src/enums/NodeType";

import { NodeUtils } from '../src/NodeUtils';

let assert: any = require('chai').assert;

function getProgramNode (bodyNodes: INode[] = []): IProgramNode {
    return {
        type: NodeType.Program,
        body: bodyNodes
    };
}

function getBlockStatementNode (bodyNodes: INode[] = []): IBlockStatementNode {
    return {
        type: NodeType.BlockStatement,
        body: bodyNodes
    };
}

function getFunctionDeclarationNode (blockStatementNode: IBlockStatementNode): IFunctionDeclarationNode {
    return {
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
}

function getIdentifierNode (): IIdentifierNode {
    return {
        type: NodeType.Identifier,
        name: 'identifier',
    };
}

function getLiteralNode (): ILiteralNode {
    return {
        type: NodeType.Literal,
        value: 'string',
        raw: `'string'`,
        'x-verbatim-property': `'string'`
    };
}

describe('NodeUtils', () => {
    describe('addXVerbatimPropertyToLiterals (node: INode): void', () => {
        let literalNode: any,
            expectedLiteralNode: any;

        beforeEach(() => {
            literalNode = getLiteralNode();

            expectedLiteralNode = Object.assign({}, literalNode);
            expectedLiteralNode['x-verbatim-property'] = `'string'`;

            NodeUtils.addXVerbatimPropertyToLiterals(literalNode)
        });

        it('should add `x-verbatim-property` to `Literal` node', () => {
            assert.deepEqual(literalNode, expectedLiteralNode);
        });
    });

    describe('appendNode (blockScopeBody: INode[], node: INode): void', () => {
        let blockStatementNode: IBlockStatementNode,
            expectedBlockStatementNode: IBlockStatementNode,
            identifierNode: IIdentifierNode;

        beforeEach(() => {
            identifierNode = getIdentifierNode();

            blockStatementNode = getBlockStatementNode();

            expectedBlockStatementNode = Object.assign({}, blockStatementNode);
            expectedBlockStatementNode.body.push(identifierNode);

            NodeUtils.appendNode(blockStatementNode.body, identifierNode)
        });

        it('should append given node to a `BlockStatement` node body', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });
    });

    describe('getBlockStatementNodeByIndex (node: INode, index: number = 0): INode', () => {
        let blockStatementNode: IBlockStatementNode,
            identifierNode: IIdentifierNode,
            literalNode: ILiteralNode;

        beforeEach(() => {
            identifierNode = getIdentifierNode();

            literalNode = getLiteralNode();

            blockStatementNode = getBlockStatementNode([
                identifierNode,
                literalNode
            ]);
        });

        it('should return block-statement child node of given node if that node has block-statement', () => {
            assert.deepEqual(NodeUtils.getBlockStatementNodeByIndex(blockStatementNode), identifierNode);
            assert.deepEqual(NodeUtils.getBlockStatementNodeByIndex(blockStatementNode, 1), literalNode);
        });

        it('should throw a `ReferenceError` if index is out of boundaries', () => {
            assert.throws(function () {
                return NodeUtils.getBlockStatementNodeByIndex(blockStatementNode, 2);
            }, ReferenceError);
        });

        it('should throw a `TypeError` if node have no a block-statement', () => {
            assert.throws(function () {
                NodeUtils.getBlockStatementNodeByIndex(identifierNode, 1)
            }, TypeError);
        });
    });

    describe('getBlockScopeOfNode (node: INode, depth: number = 0): TNodeWithBlockStatement', () => {
        let blockStatementNode: IBlockStatementNode,
            identifierNode: IIdentifierNode,
            functionDeclarationNode: IFunctionDeclarationNode,
            literalNode: ILiteralNode,
            programNode: IProgramNode;

        beforeEach(() => {
            identifierNode = getIdentifierNode();

            literalNode = getLiteralNode();

            blockStatementNode = getBlockStatementNode([
                identifierNode,
                literalNode
            ]);

            functionDeclarationNode = getFunctionDeclarationNode(blockStatementNode);

            programNode = getProgramNode([
                functionDeclarationNode
            ]);

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
            identifierNode = getIdentifierNode();

            literalNode = getLiteralNode();

            blockStatementNode = getBlockStatementNode([
                identifierNode
            ]);

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
            identifierNode = getIdentifierNode();

            literalNode = getLiteralNode();

            blockStatementNode = getBlockStatementNode([
                identifierNode,
                literalNode
            ]);

            programNode = getProgramNode([
                blockStatementNode
            ]);

            NodeUtils.parentize(blockStatementNode);

            console.log(blockStatementNode);
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
            identifierNode = getIdentifierNode();

            literalNode = getLiteralNode();

            blockStatementNode = getBlockStatementNode([
                identifierNode
            ]);

            expectedBlockStatementNode = Object.assign({}, blockStatementNode);
            expectedBlockStatementNode['body'].unshift(literalNode);

            NodeUtils.prependNode(blockStatementNode.body, literalNode)
        });

        it('should prepend given node to a `BlockStatement` node body', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });
    });
});