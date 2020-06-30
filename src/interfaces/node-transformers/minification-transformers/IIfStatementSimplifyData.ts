import * as ESTree from 'estree';

export interface IIfStatementSimplifyData {
    /**
     * @type {ESTree.Statement[]}
     */
    leadingStatements: ESTree.Statement[];

    /**
     * @type {ESTree.Statement}
     */
    statement: ESTree.Statement;

    /**
     * @type {ESTree.Expression}
     */
    expression: ESTree.Expression;

    /**
     * @type {boolean}
     */
    hasReturnStatement: boolean;

    /**
     * @type {boolean}
     */
    hasSingleExpression: boolean;
}
