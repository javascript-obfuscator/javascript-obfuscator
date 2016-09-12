import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { NodeType } from "../../src/enums/NodeType";

export class NodeMocks {
    /**
     * @param bodyNodes
     * @returns {ESTree.Program}
     */
    public static getProgramNode (bodyNodes: ESTree.Statement[] = []): ESTree.Program {
        return {
            type: NodeType.Program,
            body: bodyNodes,
            sourceType: 'script'
        };
    }

    /**
     * @param bodyNodes
     * @returns {ESTree.BlockStatement}
     */
    public static getBlockStatementNode (bodyNodes: ESTree.Statement[] = []): ESTree.BlockStatement {
        return {
            type: NodeType.BlockStatement,
            body: bodyNodes
        };
    }

    /**
     * @param bodyNodes
     * @returns {ESTree.CatchClause}
     */
    public static getCatchClauseNode (bodyNodes: ESTree.Statement[] = []): ESTree.CatchClause {
        return {
            type: NodeType.CatchClause,
            param: NodeMocks.getIdentifierNode('err'),
            body: NodeMocks.getBlockStatementNode(bodyNodes)
        };
    }

    /**
     * @param callee
     * @param args
     * @returns {ESTree.CallExpression}
     */
    public static getCallExpressionNode (
        callee: ESTree.Expression,
        args: ESTree.Expression[] | ESTree.SpreadElement[] = []
    ): ESTree.CallExpression {
        return {
            type: NodeType.CallExpression,
            callee: callee,
            arguments: args
        };
    }

    /**
     * @param expression
     * @returns {ESTree.ExpressionStatement}
     */
    public static getExpressionStatementNode (
        expression: ESTree.Expression = NodeMocks.getIdentifierNode()
    ): ESTree.ExpressionStatement {
        return {
            type: NodeType.ExpressionStatement,
            expression: expression
        };
    }

    /**
     * @param functionName
     * @param blockStatementNode
     * @param params
     * @returns {ESTree.FunctionDeclaration}
     */
    public static getFunctionDeclarationNode (
        functionName: string,
        blockStatementNode: ESTree.BlockStatement,
        params: ESTree.Identifier[] = []
    ): ESTree.FunctionDeclaration {
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
     * @returns {ESTree.IfStatement}
     */
    public static getIfStatementNode (blockStatementNode: ESTree.BlockStatement): ESTree.IfStatement {
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
     * @returns {ESTree.Identifier}
     */
    public static getIdentifierNode (identifierName: string = 'identifier'): ESTree.Identifier {
        return {
            type: NodeType.Identifier,
            name: identifierName,
        };
    }

    /**
     * @param value
     * @returns {ESTree.Literal}
     */
    public static getLiteralNode (value: boolean|number|string = 'value'): ESTree.Literal {
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
     * @return {ESTree.MemberExpression}
     */
    public static getMemberExpressionNode (
        object: ESTree.Identifier,
        property: ESTree.Identifier|ESTree.Literal
    ): ESTree.MemberExpression {
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
     * @returns {ESTree.VariableDeclaration}
     */
    public static getVariableDeclarationNode (
        declarations: ESTree.VariableDeclarator[] = [],
        kind: string = 'var'
    ): ESTree.VariableDeclaration {
        return {
            type: NodeType.VariableDeclaration,
            declarations: declarations,
            kind: kind
        };
    }

    /**
     * @param id
     * @param init
     * @returns {ESTree.VariableDeclarator}
     */
    public static getVariableDeclaratorNode (id: ESTree.Identifier, init: any): ESTree.VariableDeclarator {
        return {
            type: NodeType.VariableDeclarator,
            id: id,
            init: init
        };
    }
}
