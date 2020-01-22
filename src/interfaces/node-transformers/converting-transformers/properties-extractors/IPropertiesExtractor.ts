import * as ESTree from 'estree';

import { TPropertiesExtractorResult } from '../../../../types/node-transformers/TPropertiesExtractorResult';

export interface IPropertiesExtractor {
    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} hostNode
     * @returns {TPropertiesExtractorResult}
     */
    extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostNode: ESTree.Node
    ): TPropertiesExtractorResult;
}
