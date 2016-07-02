import { IBlockStatementNode } from "../../src/interfaces/nodes/IBlockStatementNode";
import { ICatchClauseNode } from "../../src/interfaces/nodes/ICatchClauseNode";
import { IFunctionDeclarationNode } from "../../src/interfaces/nodes/IFunctionDeclarationNode";
import { IIdentifierNode } from "../../src/interfaces/nodes/IIdentifierNode";
import { IIfStatementNode } from "../../src/interfaces/nodes/IIfStatementNode";
import { ILiteralNode } from "../../src/interfaces/nodes/ILiteralNode";
import { INode } from "../../src/interfaces/nodes/INode";
import { IProgramNode } from "../../src/interfaces/nodes/IProgramNode";

import { NodeType } from "../../src/enums/NodeType";

export class NodeMocks {
    /**
     * @param bodyNodes
     * @returns {IProgramNode}
     */
    public static getProgramNode (bodyNodes: INode[] = []): IProgramNode {
        return {
            type: NodeType.Program,
            body: bodyNodes
        };
    }

    /**
     * @param bodyNodes
     * @returns {IBlockStatementNode}
     */
    public static getBlockStatementNode (bodyNodes: INode[] = []): IBlockStatementNode {
        return {
            type: NodeType.BlockStatement,
            body: bodyNodes
        };
    }

    /**
     * @param bodyNodes
     * @returns {ICatchClauseNode}
     */
    public static getCatchClauseNode (bodyNodes: INode[] = []): ICatchClauseNode {
        return {
            type: NodeType.CatchClause,
            param: NodeMocks.getIdentifierNode('err'),
            body: NodeMocks.getBlockStatementNode(bodyNodes)
        };
    }

    /**
     * @param blockStatementNode
     * @returns {IFunctionDeclarationNode}
     */
    public static getFunctionDeclarationNode (blockStatementNode: IBlockStatementNode): IFunctionDeclarationNode {
        return {
            type: NodeType.FunctionDeclaration,
            id: NodeMocks.getIdentifierNode('test'),
            params: [],
            body: blockStatementNode,
            generator: false,
            expression: false
        };
    }

    /**
     * @param blockStatementNode
     * @returns {IIfStatementNode}
     */
    public static getIfStatementNode (blockStatementNode: IBlockStatementNode): IIfStatementNode {
        return {
            type: 'IfStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true'
            },
            consequent: blockStatementNode,
            alternate: null
        };
    }

    /**
     * @param identifierName
     * @returns {IIdentifierNode}
     */
    public static getIdentifierNode (identifierName: string = 'identifier'): IIdentifierNode {
        return {
            type: NodeType.Identifier,
            name: identifierName,
        };
    }

    /**
     * @returns {ILiteralNode}
     */
    public static getLiteralNode (): ILiteralNode {
        return {
            type: NodeType.Literal,
            value: 'string',
            raw: `'string'`,
            'x-verbatim-property': `'string'`
        };
    }
}