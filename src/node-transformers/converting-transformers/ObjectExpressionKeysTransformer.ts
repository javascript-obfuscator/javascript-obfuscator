import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TPropertiesExtractorFactory } from '../../types/container/node-transformers/TPropertiesExtractorFactory';
import { TPropertiesExtractorResult } from '../../types/node-transformers/TPropertiesExtractorResult';

import { IOptions } from '../../interfaces/options/IOptions';
import { IPropertiesExtractor } from '../../interfaces/node-transformers/converting-transformers/properties-extractors/IPropertiesExtractor';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeType } from '../../enums/node/NodeType';
import { PropertiesExtractor } from '../../enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor';
import { PropertiesExtractorFlag } from '../../enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractorResult';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class ObjectExpressionKeysTransformer extends AbstractNodeTransformer {
    /**
     * @type {Set<ESTree.Node>}
     */
    private static readonly objectExpressionNodesToSkipSet: Set<ESTree.Node> = new Set();

    /**
     * @type {Map<string, PropertiesExtractor>}
     */
    private static readonly propertiesExtractorsMap: Map <string, PropertiesExtractor> = new Map([
        [NodeType.AssignmentExpression, PropertiesExtractor.AssignmentExpressionPropertiesExtractor],
        [NodeType.AssignmentPattern, PropertiesExtractor.AssignmentPatternPropertiesExtractor],
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
        if (!this.options.transformObjectKeys) {
            return null;
        }

        if (transformationStage !== TransformationStage.Converting) {
            return null;
        }

        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                if (
                    parentNode
                    && NodeGuards.isObjectExpressionNode(node)
                ) {
                    return this.transformNode(node, parentNode);
                }
            },
            leave: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                if (
                    parentNode
                    && NodeGuards.isObjectExpressionNode(node)
                ) {
                    return this.transformNodeWithBaseExtractor(node, parentNode);
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
     * @param {ObjectExpression} objectExpressionNode
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

        return this.transformNodeWithExtractor(objectExpressionNode, parentNode, propertiesExtractorName);
    }

    /**
     * replaces:
     *     return {
     *          foo: 1,
     *          bar: 2
     *     };
     *
     * on:
     *     var object = {};
     *     object['foo'] = 1;
     *     object['bar'] = 2;
     *     return object;
     *
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} parentNode
     * @returns {NodeGuards}
     */
    public transformNodeWithBaseExtractor (objectExpressionNode: ESTree.ObjectExpression, parentNode: ESTree.Node): ESTree.Node {
        if (!objectExpressionNode.properties.length) {
            return objectExpressionNode;
        }

        if (ObjectExpressionKeysTransformer.objectExpressionNodesToSkipSet.has(objectExpressionNode)) {
            return objectExpressionNode;
        }

        return this.transformNodeWithExtractor(objectExpressionNode, parentNode, PropertiesExtractor.BasePropertiesExtractor);
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} parentNode
     * @param {PropertiesExtractor} propertiesExtractorName
     * @returns {Node}
     */
    private transformNodeWithExtractor (
        objectExpressionNode: ESTree.ObjectExpression,
        parentNode: ESTree.Node,
        propertiesExtractorName: PropertiesExtractor
    ): ESTree.Node {
        const propertiesExtractor: IPropertiesExtractor = this.propertiesExtractorFactory(propertiesExtractorName);
        const extractedResult: TPropertiesExtractorResult =
            propertiesExtractor.extract(objectExpressionNode, parentNode);

        switch (extractedResult) {
            case PropertiesExtractorFlag.Skip:
                ObjectExpressionKeysTransformer.objectExpressionNodesToSkipSet.add(objectExpressionNode);

                return objectExpressionNode;

            default:
                return extractedResult;
        }
    }
}
