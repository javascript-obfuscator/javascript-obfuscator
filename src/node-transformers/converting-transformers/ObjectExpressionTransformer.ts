import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';

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
     * @type {IEscapeSequenceEncoder}
     */
    private readonly escapeSequenceEncoder: IEscapeSequenceEncoder;

    /**
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.escapeSequenceEncoder = escapeSequenceEncoder;
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Converting:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
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
            .forEach((property: ESTree.Property) => {
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

        property.key = NodeFactory.literalNode(this.getPropertyKeyValue(property.key.value));
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

        property.key = NodeFactory.literalNode(this.getPropertyKeyValue(property.key.name));
    }

    /**
     * @param {string} inputValue
     * @returns {string}
     */
    private getPropertyKeyValue (inputValue: string): string {
        return this.options.unicodeEscapeSequence
            ? this.escapeSequenceEncoder.encode(inputValue, true)
            : inputValue;
    }
}
