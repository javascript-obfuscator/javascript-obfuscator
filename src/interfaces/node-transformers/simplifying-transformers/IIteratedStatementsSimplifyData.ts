import * as ESTree from 'estree';

export interface IIteratedStatementsSimplifyData {
    /**
     * @type {number | null}
     */
    startIndex: number | null;

    /**
     * @type {ESTree.Expression[]}
     */
    unwrappedExpressions: ESTree.Expression[];

    /**
     * @type {boolean}
     */
    hasReturnStatement: boolean;
}
