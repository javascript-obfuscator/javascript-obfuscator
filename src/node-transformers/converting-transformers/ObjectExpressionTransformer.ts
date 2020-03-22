import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
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
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Converting:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isObjectExpressionNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (objectExpressionNode: ESTree.ObjectExpression, parentNode: ESTree.Node): ESTree.Node {
        objectExpressionNode.properties
            .forEach((property: ESTree.Property | ESTree.SpreadElement) => {
                if (!NodeGuards.isPropertyNode(property)) {
                    return;
                }

                if (!property.key) {
                    return;
                }

                if (property.computed) {
                    this.transformComputedProperty(property);
                } else {
                    this.transformBaseProperty(property);
                }
            });

        return objectExpressionNode;
    }

    /**
     * @param {Property} property
     */
    private transformComputedProperty (property: ESTree.Property): void {
        if (!NodeGuards.isLiteralNode(property.key) || !(typeof property.key.value === 'string')) {
            return;
        }

        property.key = NodeFactory.literalNode(property.key.value);
    }

    /**
     * @param {Property} property
     */
    private transformBaseProperty (property: ESTree.Property): void {
        if (property.shorthand) {
            property.shorthand = false;
        }

        if (!NodeGuards.isIdentifierNode(property.key)) {
            return;
        }

        property.key = NodeFactory.literalNode(property.key.name);
    }
}
