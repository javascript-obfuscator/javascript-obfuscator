/* eslint-disable max-lines */
import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { TStatement } from '../types/node/TStatement';

import { NodeType } from '../enums/node/NodeType';

export class NodeFactory {
    /**
     * @param {TStatement[]} body
     * @returns {Program}
     */
    public static programNode (body: TStatement[] = []): ESTree.Program {
        return {
            type: NodeType.Program,
            body,
            sourceType: 'script',
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {(Expression | SpreadElement)[]} elements
     * @returns {ArrayExpression}
     */
    public static arrayExpressionNode (
        elements: (ESTree.Expression | ESTree.SpreadElement)[] = []
    ): ESTree.ArrayExpression {
        return {
            type: NodeType.ArrayExpression,
            elements,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Pattern[]} params
     * @param {boolean} expression
     * @param {BlockStatement | Expression} body
     * @returns {ArrowFunctionExpression}
     */
    public static arrowFunctionExpressionNode (
        params: ESTree.Pattern[],
        expression: boolean,
        body: ESTree.BlockStatement | ESTree.Expression
    ): ESTree.ArrowFunctionExpression {
        return {
            type: NodeType.ArrowFunctionExpression,
            params,
            expression,
            body
        };
    }

    /**
     * @param {AssignmentOperator} operator
     * @param {Pattern | MemberExpression} left
     * @param {Expression} right
     * @returns {AssignmentExpression}
     */
    public static assignmentExpressionNode (
        operator: ESTree.AssignmentOperator,
        left: ESTree.Pattern | ESTree.MemberExpression,
        right: ESTree.Expression
    ): ESTree.AssignmentExpression {
        return {
            type: NodeType.AssignmentExpression,
            operator,
            left,
            right,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {BinaryOperator} operator
     * @param {Expression} left
     * @param {Expression} right
     * @returns {BinaryExpression}
     */
    public static binaryExpressionNode (
        operator: ESTree.BinaryOperator,
        left: ESTree.Expression,
        right: ESTree.Expression,
    ): ESTree.BinaryExpression {
        return {
            type: NodeType.BinaryExpression,
            operator,
            left,
            right,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Statement[]} body
     * @returns {BlockStatement}
     */
    public static blockStatementNode (body: ESTree.Statement[] = []): ESTree.BlockStatement {
        return {
            type: NodeType.BlockStatement,
            body,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Identifier} label
     * @returns {BreakStatement}
     */
    public static breakStatement (label?: ESTree.Identifier): ESTree.BreakStatement {
        return {
            type: NodeType.BreakStatement,
            label,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Expression} callee
     * @param {(Expression | SpreadElement)[]} args
     * @param {boolean} optional
     * @returns {CallExpression}
     */
    public static callExpressionNode (
        callee: ESTree.Expression,
        args: (ESTree.Expression | ESTree.SpreadElement)[] = [],
        optional: boolean = false,
    ): ESTree.CallExpression {
        return {
            type: NodeType.CallExpression,
            callee,
            optional,
            arguments: args,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {ESTree.Expression} test
     * @param {ESTree.Expression} consequent
     * @param {ESTree.Expression} alternate
     * @returns {ESTree.ConditionalExpression}
     */
    public static conditionalExpressionNode (
        test: ESTree.Expression,
        consequent: ESTree.Expression,
        alternate: ESTree.Expression
    ): ESTree.ConditionalExpression {
        return {
            type: NodeType.ConditionalExpression,
            test,
            consequent,
            alternate,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Identifier} label
     * @returns {ContinueStatement}
     */
    public static continueStatement (label?: ESTree.Identifier): ESTree.ContinueStatement {
        return {
            type: NodeType.ContinueStatement,
            label,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Literal} expression
     * @param {string} directive
     * @returns {Directive}
     */
    public static directiveNode (
        expression: ESTree.Literal,
        directive: string
    ): ESTree.Directive {
        return {
            type: NodeType.ExpressionStatement,
            expression,
            directive,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Literal} source
     * @returns {ExportAllDeclaration}
     */
    public static exportAllDeclarationNode (
        source: ESTree.Literal
    ): ESTree.ExportAllDeclaration {
        return {
            type: NodeType.ExportAllDeclaration,
            source,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {ExportSpecifier[]} specifiers
     * @param {Literal} source
     * @returns {ExportNamedDeclaration}
     */
    public static exportNamedDeclarationNode (
        specifiers: ESTree.ExportSpecifier[],
        source: ESTree.Literal
    ): ESTree.ExportNamedDeclaration {
        return {
            type: NodeType.ExportNamedDeclaration,
            specifiers,
            source,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Expression} expression
     * @returns {ExpressionStatement}
     */
    public static expressionStatementNode (expression: ESTree.Expression): ESTree.ExpressionStatement {
        return {
            type: NodeType.ExpressionStatement,
            expression,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {string} functionName
     * @param {Identifier[]} params
     * @param {BlockStatement} body
     * @returns {FunctionDeclaration}
     */
    public static functionDeclarationNode (
        functionName: string,
        params: ESTree.Identifier[],
        body: ESTree.BlockStatement
    ): ESTree.FunctionDeclaration {
        return {
            type: NodeType.FunctionDeclaration,
            id: NodeFactory.identifierNode(functionName),
            params,
            body,
            generator: false,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Identifier[]} params
     * @param {BlockStatement} body
     * @returns {FunctionExpression}
     */
    public static functionExpressionNode (
        params: ESTree.Identifier[],
        body: ESTree.BlockStatement
    ): ESTree.FunctionExpression {
        return {
            type: NodeType.FunctionExpression,
            params,
            body,
            generator: false,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {ESTree.Expression} test
     * @param {ESTree.Statement} consequent
     * @param {ESTree.Statement | null} alternate
     * @returns {ESTree.IfStatement}
     */
    public static ifStatementNode (
        test: ESTree.Expression,
        consequent: ESTree.Statement,
        alternate?: ESTree.Statement | null
    ): ESTree.IfStatement {
        return {
            type: NodeType.IfStatement,
            test,
            consequent,
            ...alternate && { alternate },
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {string} name
     * @returns {Identifier}
     */
    public static identifierNode (name: string): ESTree.Identifier {
        return {
            type: NodeType.Identifier,
            name,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {(ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[]} specifiers
     * @param {Literal} source
     * @returns {ImportDeclaration}
     */
    public static importDeclarationNode (
        specifiers: (ESTree.ImportSpecifier | ESTree.ImportDefaultSpecifier | ESTree.ImportNamespaceSpecifier)[],
        source: ESTree.Literal
    ): ESTree.ImportDeclaration {
        return {
            type: NodeType.ImportDeclaration,
            specifiers,
            source,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {boolean | number | string} value
     * @param {string} raw
     * @returns {Literal}
     */
    public static literalNode (value: boolean | number | string, raw?: string): ESTree.Literal {
        raw = raw !== undefined ? raw : `'${value}'`;

        return {
            type: NodeType.Literal,
            value,
            raw,
            'x-verbatim-property': {
                content: raw,
                precedence: escodegen.Precedence.Primary
            },
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {LogicalOperator} operator
     * @param {Expression} left
     * @param {Expression} right
     * @returns {LogicalExpression}
     */
    public static logicalExpressionNode (
        operator: ESTree.LogicalOperator,
        left: ESTree.Expression,
        right: ESTree.Expression,
    ): ESTree.LogicalExpression {
        return {
            type: NodeType.LogicalExpression,
            operator,
            left,
            right,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Expression | Super} object
     * @param {Expression} property
     * @param {boolean} computed
     * @param {boolean} optional
     * @returns {MemberExpression}
     */
    public static memberExpressionNode (
        object: ESTree.Expression | ESTree.Super,
        property: ESTree.Expression,
        computed: boolean = false,
        optional: boolean = false,
    ): ESTree.MemberExpression {
        return {
            type: NodeType.MemberExpression,
            computed,
            object,
            optional,
            property,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {(ESTree.Property | ESTree.SpreadElement)[]} properties
     * @returns {ESTree.ObjectExpression}
     */
    public static objectExpressionNode (properties: (ESTree.Property | ESTree.SpreadElement)[]): ESTree.ObjectExpression {
        return {
            type: NodeType.ObjectExpression,
            properties,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Expression} key
     * @param {Expression | Pattern} value
     * @param {boolean} computed
     * @returns {Property}
     */
    public static propertyNode (
        key: ESTree.Expression,
        value: ESTree.Expression | ESTree.Pattern,
        computed: boolean = false
    ): ESTree.Property {
        return {
            type: NodeType.Property,
            key,
            value,
            kind: 'init',
            method: false,
            shorthand: false,
            computed,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Expression} argument
     * @returns {ReturnStatement}
     */
    public static returnStatementNode (argument: ESTree.Expression): ESTree.ReturnStatement {
        return {
            type: NodeType.ReturnStatement,
            argument,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {ESTree.Expression[]} expressions
     * @returns {ESTree.SequenceExpression}
     */
    public static sequenceExpressionNode (expressions: ESTree.Expression[]): ESTree.SequenceExpression {
        return {
            type: NodeType.SequenceExpression,
            expressions,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Expression} discriminant
     * @param {SwitchCase[]} cases
     * @returns {SwitchStatement}
     */
    public static switchStatementNode (
        discriminant: ESTree.Expression,
        cases: ESTree.SwitchCase[]
    ): ESTree.SwitchStatement {
        return {
            type: NodeType.SwitchStatement,
            discriminant,
            cases,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Expression} test
     * @param {Statement[]} consequent
     * @returns {SwitchCase}
     */
    public static switchCaseNode (test: ESTree.Expression, consequent: ESTree.Statement[]): ESTree.SwitchCase {
        return {
            type: NodeType.SwitchCase,
            test,
            consequent,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {UnaryOperator} operator
     * @param {Expression} argument
     * @param {true} prefix
     * @returns {UnaryExpression}
     */
    public static unaryExpressionNode (
        operator: ESTree.UnaryOperator,
        argument: ESTree.Expression,
        prefix: true = true
    ): ESTree.UnaryExpression {
        return {
            type: NodeType.UnaryExpression,
            operator,
            argument,
            prefix,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {UpdateOperator} operator
     * @param {Expression} argumentExpr
     * @returns {UpdateExpression}
     */
    public static updateExpressionNode (operator: ESTree.UpdateOperator, argumentExpr: ESTree.Expression): ESTree.UpdateExpression {
        return {
            type: NodeType.UpdateExpression,
            operator,
            argument: argumentExpr,
            prefix: false,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {ESTree.TemplateElement["value"]} value
     * @param {boolean} tail
     * @returns {ESTree.TemplateElement}
     */
    public static templateElement (
        value: ESTree.TemplateElement['value'],
        tail: boolean
    ): ESTree.TemplateElement {
        return {
            type: NodeType.TemplateElement,
            value,
            tail,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {ESTree.Expression[]} expressions
     * @param {ESTree.TemplateElement[]} quasis
     * @returns {ESTree.TemplateLiteral}
     */
    public static templateLiteral (
        expressions: ESTree.Expression[],
        quasis: ESTree.TemplateElement[]
    ): ESTree.TemplateLiteral {
        return {
            type: NodeType.TemplateLiteral,
            expressions,
            quasis,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {VariableDeclarator[]} declarations
     * @param {string} kind
     * @returns {VariableDeclaration}
     */
    public static variableDeclarationNode (
        declarations: ESTree.VariableDeclarator[] = [],
        kind: 'var' | 'let' | 'const' = 'var'
    ): ESTree.VariableDeclaration {
        return {
            type: NodeType.VariableDeclaration,
            declarations,
            kind,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Identifier} id
     * @param {Expression | null} init
     * @returns {VariableDeclarator}
     */
    public static variableDeclaratorNode (id: ESTree.Identifier, init: ESTree.Expression | null): ESTree.VariableDeclarator {
        return {
            type: NodeType.VariableDeclarator,
            id,
            init,
            metadata: { ignoredNode: false }
        };
    }

    /**
     * @param {Expression} test
     * @param {Statement} body
     * @returns {WhileStatement}
     */
    public static whileStatementNode (test: ESTree.Expression, body: ESTree.Statement): ESTree.WhileStatement {
        return {
            type: NodeType.WhileStatement,
            test,
            body,
            metadata: { ignoredNode: false }
        };
    }
}
