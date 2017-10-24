import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeType } from '../../enums/node/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

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
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                if (parentNode && NodeGuards.isObjectExpressionNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (objectExpressionNode: ESTree.ObjectExpression, parentNode: ESTree.Node): ESTree.Node {
        objectExpressionNode.properties
            .forEach((property: ESTree.Property) => {
                if (property.computed) {
                    return;
                }

                if (property.shorthand) {
                    property.shorthand = false;
                }

                if (NodeGuards.isIdentifierNode(property.key)) {
                    property.key = ObjectExpressionTransformer.transformIdentifierPropertyKey(property.key);
                }
            });

        return objectExpressionNode;
    }
}
