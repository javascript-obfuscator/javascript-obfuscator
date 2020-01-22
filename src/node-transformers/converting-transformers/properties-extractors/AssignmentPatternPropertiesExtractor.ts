import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TObjectExpressionKeysTransformerCustomNodeFactory } from '../../../types/container/custom-nodes/TObjectExpressionKeysTransformerCustomNodeFactory';
import { TPropertiesExtractorResult } from '../../../types/node-transformers/TPropertiesExtractorResult';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { PropertiesExtractorFlag } from '../../../enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractorResult';

import { AbstractPropertiesExtractor } from './AbstractPropertiesExtractor';
import { BasePropertiesExtractor } from './BasePropertiesExtractor';
import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class AssignmentPatternPropertiesExtractor extends BasePropertiesExtractor {
    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {TObjectExpressionKeysTransformerCustomNodeFactory} objectExpressionKeysTransformerCustomNodeFactory
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.Factory__IObjectExpressionKeysTransformerCustomNode)
            objectExpressionKeysTransformerCustomNodeFactory: TObjectExpressionKeysTransformerCustomNodeFactory,
    ) {
        super(randomGenerator, options, objectExpressionKeysTransformerCustomNodeFactory);
    }

    /**
     * @param {AssignmentPattern} hostNode
     * @returns {boolean}
     */
    private static isProhibitedHostParent (hostNode: ESTree.AssignmentPattern): boolean {
        const hostParentNode: ESTree.Node | undefined = hostNode.parentNode;

        if (!hostParentNode) {
            return true;
        }

        if (NodeGuards.isFunctionNode(hostParentNode)) {
            return AssignmentPatternPropertiesExtractor.isProhibitedHostParentFunction(hostNode, hostParentNode);
        }

        return false;
    }

    /**
     * @param {AssignmentExpression} hostNode
     * @param {Function} hostParentNode
     * @returns {boolean}
     */
    private static isProhibitedHostParentFunction (
        hostNode: ESTree.AssignmentPattern,
        hostParentNode: ESTree.Function
    ): boolean {
        const { params } = hostParentNode;
        const indexOfParameter: number = params.indexOf(hostNode);
        const isFirstParameter: boolean = indexOfParameter === 0;

        const parametersBeforeCurrentParameter: ESTree.Pattern[] = params.slice(0, indexOfParameter + 1);
        const parametersIdentifierNamesSet: Set<string> = new Set();

        let isProhibitedNode: boolean = false;

        // should mark node as prohibited if identifier of node using inside previous function parameters
        for (const parameter of parametersBeforeCurrentParameter) {
            estraverse.traverse(parameter, {
                enter: (node: ESTree.Node): void | estraverse.VisitorOption => {
                    if (!NodeGuards.isIdentifierNode(node)) {
                        return;
                    }

                    if (!isFirstParameter && parametersIdentifierNamesSet.has(node.name)) {
                        isProhibitedNode = true;

                        return estraverse.VisitorOption.Break;
                    }

                    parametersIdentifierNamesSet.add(node.name);
                }
            });

            if (isProhibitedNode) {
                break;
            }
        }

        return isProhibitedNode;
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {AssignmentPattern} hostNode
     * @returns {TPropertiesExtractorResult}
     */
    public extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostNode: ESTree.AssignmentPattern
    ): TPropertiesExtractorResult {
        const leftNode: ESTree.Pattern = hostNode.left;

        // left node shouldn't be as Pattern node
        if (AbstractPropertiesExtractor.isProhibitedPattern(leftNode)) {
            return objectExpressionNode;
        }

        // left node shouldn't be as prohibited node
        if (AssignmentPatternPropertiesExtractor.isProhibitedHostParent(hostNode)) {
            return PropertiesExtractorFlag.Skip;
        }

        return this.transformObjectExpressionNode(
            objectExpressionNode,
            leftNode
        );
    }
}
