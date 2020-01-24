import * as ESTree from 'estree';

export type TPropertiesExtractorResult = {
    nodeToReplace: ESTree.Node;
    objectExpressionHostStatement: ESTree.Statement;
    objectExpressionNode: ESTree.ObjectExpression;
};
