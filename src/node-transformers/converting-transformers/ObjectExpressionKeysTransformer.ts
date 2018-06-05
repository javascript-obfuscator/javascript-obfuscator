import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TPropertiesExtractorFactory } from '../../types/container/node-transformers/TPropertiesExtractorFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IPropertiesExtractor } from '../../interfaces/node-transformers/converting-transformers/properties-extractors/IPropertiesExtractor';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeType } from '../../enums/node/NodeType';
import { PropertiesExtractor } from '../../enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class ObjectExpressionKeysTransformer extends AbstractNodeTransformer {
    /**
     * @type {Map<string, PropertiesExtractor>}
     */
    private static readonly propertiesExtractorsMap: Map <string, PropertiesExtractor> = new Map([
        [NodeType.AssignmentExpression, PropertiesExtractor.AssignmentExpressionPropertiesExtractor],
        [NodeType.VariableDeclarator, PropertiesExtractor.VariableDeclaratorPropertiesExtractor]
    ]);

    /**
     * @type {TPropertiesExtractorFactory}
     */
    private readonly propertiesExtractorFactory: TPropertiesExtractorFactory;

    /**
     * @param {TPropertiesExtractorFactory} propertiesExtractorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IPropertiesExtractor)
            propertiesExtractorFactory: TPropertiesExtractorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.propertiesExtractorFactory = propertiesExtractorFactory;
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        if (transformationStage !== TransformationStage.Converting) {
            return null;
        }

        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                if (
                    this.options.transformObjectKeys
                    && parentNode
                    && NodeGuards.isObjectExpressionNode(node)
                ) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * replaces:
     *     var object = {
     *          foo: 1,
     *          bar: 2
     *     };
     *
     * on:
     *     var object = {};
     *     object['foo'] = 1;
     *     object['bar'] = 2;
     *
     * @param {MemberExpression} objectExpressionNode
     * @param {Node} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (objectExpressionNode: ESTree.ObjectExpression, parentNode: ESTree.Node): ESTree.Node {
        if (!objectExpressionNode.properties.length) {
            return objectExpressionNode;
        }

        const propertiesExtractorName: PropertiesExtractor | undefined = ObjectExpressionKeysTransformer
            .propertiesExtractorsMap
            .get(parentNode.type);

        if (!propertiesExtractorName) {
            return objectExpressionNode;
        }

        const propertiesExtractor: IPropertiesExtractor = this.propertiesExtractorFactory(propertiesExtractorName);

        return propertiesExtractor.extract(objectExpressionNode, parentNode);
    }
}
