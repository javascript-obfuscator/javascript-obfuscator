import * as ESTree from 'estree';

export type TNumericalExpressionDataToNodeConverterLiteralNodeGetter = (
    number: number,
    isPositiveNumber: boolean
) => ESTree.Expression;
