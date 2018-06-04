import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { AbstractPropertiesExtractor } from './AbstractPropertiesExtractor';

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
     * @param {ObjectExpression} objectExpressionNode
     * @param {AssignmentExpression} hostNode
     * @returns {Node}
     */
    public extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostNode: ESTree.AssignmentExpression
    ): ESTree.Node {
        const leftNode: ESTree.MemberExpression | ESTree.Pattern = hostNode.left;

        // left node shouldn't be as Pattern node
        if (AbstractPropertiesExtractor.isProhibitedPattern(leftNode)) {
            return objectExpressionNode;
        }

        return this.transformObjectExpressionNode(
            objectExpressionNode,
            leftNode
        );
    }
}
