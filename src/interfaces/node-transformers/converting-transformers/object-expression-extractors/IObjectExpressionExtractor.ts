import * as ESTree from 'estree';

import { IObjectExpressionExtractorResult } from './IObjectExpressionExtractorResult';

export interface IObjectExpressionExtractor {
    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @returns {IObjectExpressionExtractorResult}
     */
    extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): IObjectExpressionExtractorResult;
}
