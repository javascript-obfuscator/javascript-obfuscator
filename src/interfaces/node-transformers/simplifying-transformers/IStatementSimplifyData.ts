import * as ESTree from 'estree';

export interface IStatementSimplifyData {
    /**
     * @type {ESTree.Statement[]}
     */
    leadingStatements: ESTree.Statement[];

    trailingStatement: {
        /**
         * @type {ESTree.Statement | null}
         */
        statement: ESTree.Statement;

        /**
         * @type {ESTree.Expression | null}
         */
        expression: ESTree.Expression;
    } | null;

    /**
     * @type {boolean}
     */
    hasReturnStatement: boolean;

    /**
     * @type {boolean}
     */
    hasSingleExpression: boolean;
}
