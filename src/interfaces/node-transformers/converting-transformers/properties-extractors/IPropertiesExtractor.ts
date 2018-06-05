import * as ESTree from 'estree';

export interface IPropertiesExtractor {
    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} hostNode
     * @returns {Node}
     */
    extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostNode: ESTree.Node
    ): ESTree.Node;
}
