import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeType } from '../../enums/node/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

/**
 * replaces:
 *     var object = { PSEUDO: 1 };
 *
 * on:
 *     var object = { 'PSEUDO': 1 };
 */
@injectable()
export class ObjectExpressionTransformer extends AbstractNodeTransformer {
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
     * @param {Identifier} node
     * @returns {Literal}
     */
    private static transformIdentifierPropertyKey (node: ESTree.Identifier): ESTree.Literal {
        return {
            type: NodeType.Literal,
            value: node.name,
            raw: `'${node.name}'`
        };
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isObjectExpressionNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (objectExpressionNode: ESTree.ObjectExpression, parentNode: ESTree.Node): ESTree.Node {
        objectExpressionNode.properties
            .forEach((property: ESTree.Property) => {
                if (property.shorthand) {
                    property.shorthand = false;
                }

                if (Node.isIdentifierNode(property.key)) {
                    property.key = ObjectExpressionTransformer.transformIdentifierPropertyKey(property.key);
                }
            });

        return objectExpressionNode;
    }
}
