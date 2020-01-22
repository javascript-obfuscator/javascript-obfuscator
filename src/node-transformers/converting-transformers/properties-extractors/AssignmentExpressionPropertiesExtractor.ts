import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TPropertiesExtractorResult } from '../../../types/node-transformers/TPropertiesExtractorResult';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { AbstractPropertiesExtractor } from './AbstractPropertiesExtractor';
import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class AssignmentExpressionPropertiesExtractor extends AbstractPropertiesExtractor {
    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {Node} node
     * @returns {propertyValueNode is Pattern}
     */
    private static isProhibitedHostParent (node: ESTree.Node): node is ESTree.Pattern {
        if (NodeGuards.isMemberExpressionNode(node)) {
            return true;
        }

        if (AssignmentExpressionPropertiesExtractor.isProhibitedStatementNode(node)) {
            return true;
        }

        // statements without block statement
        return NodeGuards.isExpressionStatementNode(node)
            && !!node.parentNode
            && AssignmentExpressionPropertiesExtractor.isProhibitedStatementNode(node.parentNode);
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    private static isProhibitedStatementNode (node: ESTree.Node): boolean {
        return NodeGuards.isIfStatementNode(node)
            || NodeGuards.isForStatementTypeNode(node)
            || NodeGuards.isWhileStatementNode(node);
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {AssignmentExpression} hostNode
     * @returns {TPropertiesExtractorResult}
     */
    public extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostNode: ESTree.AssignmentExpression
    ): TPropertiesExtractorResult {
        const hostParentNode: ESTree.Node | undefined = hostNode.parentNode;
        const leftNode: ESTree.MemberExpression | ESTree.Pattern = hostNode.left;

        // left node shouldn't be as Pattern node
        if (AbstractPropertiesExtractor.isProhibitedPattern(leftNode)) {
            return objectExpressionNode;
        }

        // left node shouldn't be as prohibited node
        if (hostParentNode && AssignmentExpressionPropertiesExtractor.isProhibitedHostParent(hostParentNode)) {
            return objectExpressionNode;
        }

        return this.transformObjectExpressionNode(
            objectExpressionNode,
            leftNode
        );
    }
}
