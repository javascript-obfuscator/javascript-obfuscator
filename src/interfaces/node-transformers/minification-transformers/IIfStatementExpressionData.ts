import * as ESTree from 'estree';

export interface IIfStatementExpressionData {
    expression: ESTree.Expression;
    hasReturnStatement: boolean;
}
