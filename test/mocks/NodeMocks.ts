import { TStatement } from "../../src/types/TStatement";

import { IBlockStatementNode } from "../../src/interfaces/nodes/IBlockStatementNode";
import { ICatchClauseNode } from "../../src/interfaces/nodes/ICatchClauseNode";
import { IExpressionStatementNode } from "../../src/interfaces/nodes/IExpressionStatementNode";
import { IFunctionDeclarationNode } from "../../src/interfaces/nodes/IFunctionDeclarationNode";
import { IIdentifierNode } from "../../src/interfaces/nodes/IIdentifierNode";
import { IIfStatementNode } from "../../src/interfaces/nodes/IIfStatementNode";
import { ILiteralNode } from "../../src/interfaces/nodes/ILiteralNode";
import { IProgramNode } from "../../src/interfaces/nodes/IProgramNode";

import { NodeType } from "../../src/enums/NodeType";

export class NodeMocks {
    /**
     * @param bodyNodes
     * @returns {IProgramNode}
     */
    public static getProgramNode (bodyNodes: TStatement[] = []): IProgramNode {
        return {
            type: NodeType.Program,
            body: bodyNodes
        };
    }

    /**
     * @param bodyNodes
     * @returns {IBlockStatementNode}
     */
    public static getBlockStatementNode (bodyNodes: TStatement[] = []): IBlockStatementNode {
        return {
            type: NodeType.BlockStatement,
            body: bodyNodes
        };
    }

    /**
     * @param bodyNodes
     * @returns {ICatchClauseNode}
     */
    public static getCatchClauseNode (bodyNodes: TStatement[] = []): ICatchClauseNode {
        return {
            type: NodeType.CatchClause,
            param: NodeMocks.getIdentifierNode('err'),
            body: NodeMocks.getBlockStatementNode(bodyNodes)
        };
    }

    /**
     * @returns {IExpressionStatementNode}
     */
    public static getExpressionStatementNode (): IExpressionStatementNode {
        return {
            type: NodeType.ExpressionStatement,
            expression: NodeMocks.getIdentifierNode()
        };
    }

    /**
     * @param functionName
     * @param blockStatementNode
     * @returns {IFunctionDeclarationNode}
     */
    public static getFunctionDeclarationNode (functionName: string, blockStatementNode: IBlockStatementNode): IFunctionDeclarationNode {
        return {
            type: NodeType.FunctionDeclaration,
            id: NodeMocks.getIdentifierNode(functionName),
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
