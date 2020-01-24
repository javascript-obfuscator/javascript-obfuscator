import * as ESTree from 'estree';

import { TPropertiesExtractorResult } from '../../../../types/node-transformers/TPropertiesExtractorResult';

export interface IPropertiesExtractor {
    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @returns {TPropertiesExtractorResult}
     */
    extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): TPropertiesExtractorResult;
}
