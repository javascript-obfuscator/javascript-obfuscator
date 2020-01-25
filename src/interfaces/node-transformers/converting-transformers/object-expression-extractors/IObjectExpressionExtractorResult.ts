import * as ESTree from 'estree';

export interface IObjectExpressionExtractorResult {
    /**
     * @type {Node}
     */
    nodeToReplace: ESTree.Node;

    /**
     * @type {Statement}
     */
    objectExpressionHostStatement: ESTree.Statement;

    /**
     * @type {ObjectExpression}
     */
    objectExpressionNode: ESTree.ObjectExpression;
}
