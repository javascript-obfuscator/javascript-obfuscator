import * as escodegen from 'escodegen';

import { TExpression } from "../../src/types/nodes/TExpression";
import { TStatement } from "../../src/types/nodes/TStatement";

import { IBlockStatementNode } from "../../src/interfaces/nodes/IBlockStatementNode";
import { ICallExpressionNode } from "../../src/interfaces/nodes/ICallExpressionNode";
import { ICatchClauseNode } from "../../src/interfaces/nodes/ICatchClauseNode";
import { IExpressionStatementNode } from "../../src/interfaces/nodes/IExpressionStatementNode";
import { IFunctionDeclarationNode } from "../../src/interfaces/nodes/IFunctionDeclarationNode";
import { IIdentifierNode } from "../../src/interfaces/nodes/IIdentifierNode";
import { IIfStatementNode } from "../../src/interfaces/nodes/IIfStatementNode";
import { ILiteralNode } from "../../src/interfaces/nodes/ILiteralNode";
import { IMemberExpressionNode } from "../../src/interfaces/nodes/IMemberExpressionNode";
import { IProgramNode } from "../../src/interfaces/nodes/IProgramNode";
import { ISpreadElementNode } from "../../src/interfaces/nodes/ISpreadElementNode";
import { IVariableDeclarationNode } from "../../src/interfaces/nodes/IVariableDeclarationNode";
import { IVariableDeclaratorNode } from "../../src/interfaces/nodes/IVariableDeclaratorNode";

import { NodeType } from "../../src/enums/NodeType";

export class NodeMocks {
    /**
     * @param bodyNodes
     * @returns {IProgramNode}
     */
    public static getProgramNode (bodyNodes: TStatement[] = []): IProgramNode {
        return {
            type: NodeType.Program,
            body: bodyNodes,
            sourceType: 'script'
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
     * @param callee
     * @param args
     * @returns {ICallExpressionNode}
     */
    public static getCallExpressionNode (
        callee: TExpression,
        args: TExpression[] | ISpreadElementNode[] = []
    ): ICallExpressionNode {
        return {
            type: NodeType.CallExpression,
            callee: callee,
            arguments: args
        };
    }

    /**
     * @param expression
     * @returns {IExpressionStatementNode}
     */
    public static getExpressionStatementNode (
        expression: TExpression = NodeMocks.getIdentifierNode()
    ): IExpressionStatementNode {
        return {
            type: NodeType.ExpressionStatement,
            expression: expression
        };
    }

    /**
     * @param functionName
     * @param blockStatementNode
     * @param params
     * @returns {IFunctionDeclarationNode}
     */
    public static getFunctionDeclarationNode (
        functionName: string,
        blockStatementNode: IBlockStatementNode,
        params: IIdentifierNode[] = []
    ): IFunctionDeclarationNode {
        return {
            type: NodeType.FunctionDeclaration,
            id: NodeMocks.getIdentifierNode(functionName),
            params: params,
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
     * @param value
     * @returns {ILiteralNode}
     */
    public static getLiteralNode (value: boolean|number|string = 'value'): ILiteralNode {
        return {
            type: NodeType.Literal,
            value: value,
            raw: `'${value}'`,
            'x-verbatim-property': {
                content: `'${value}'`,
                precedence: escodegen.Precedence.Primary
            }
        };
    }

    /**
     * @param object
     * @param property
     * @return {IMemberExpressionNode}
     */
    public static getMemberExpressionNode (
        object: IIdentifierNode,
        property: IIdentifierNode|ILiteralNode
    ): IMemberExpressionNode {
        return {
            type: NodeType.MemberExpression,
            computed: false,
            object: object,
            property: property
        };
    }

    /**
     * @param declarations
     * @param kind
     * @returns {IVariableDeclarationNode}
     */
    public static getVariableDeclarationNode (
        declarations: IVariableDeclaratorNode[] = [],
        kind: string = 'var'
    ): IVariableDeclarationNode {
        return {
            type: NodeType.VariableDeclaration,
            declarations: declarations,
            kind: kind
        };
    }

    /**
     * @param id
     * @param init
     * @returns {IVariableDeclaratorNode}
     */
    public static getVariableDeclaratorNode (id: IIdentifierNode, init: any): IVariableDeclaratorNode {
        return {
            type: NodeType.VariableDeclarator,
            id: id,
            init: init
        };
    }
}
