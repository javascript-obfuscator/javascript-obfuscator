import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TNumberNumericalExpressionData } from '../../types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';

import { INumberNumericalExpressionAnalyzer } from '../../interfaces/analyzers/number-numerical-expression-analyzer/INumberNumericalExpressionAnalyzer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeFactory } from '../../node/NodeFactory';
import { NumericalExpressionDataToNodeConverter } from '../../node/NumericalExpressionDataToNodeConverter';

/**
 * replaces:
 *     var number = 123;
 *
 * on:
 *     var number = 50 + (100 * 2) - 127;
 */
@injectable()
export class NumberToNumericalExpressionTransformer extends AbstractNodeTransformer {
    /**
     * @type {INumberNumericalExpressionAnalyzer}
     */
    private readonly numberNumericalExpressionAnalyzer: INumberNumericalExpressionAnalyzer;

    /**
     * @param {INumberNumericalExpressionAnalyzer} numberNumericalExpressionAnalyzer
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.INumberNumericalExpressionAnalyzer)
            numberNumericalExpressionAnalyzer: INumberNumericalExpressionAnalyzer,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.numberNumericalExpressionAnalyzer = numberNumericalExpressionAnalyzer;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        if (!this.options.numbersToExpressions) {
            return null;
        }

        switch (nodeTransformationStage) {
            case NodeTransformationStage.Converting:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isLiteralNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Literal} literalNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): ESTree.Node {
        if (typeof literalNode.value !== 'number') {
            return literalNode;
        }

        if (NodeGuards.isPropertyNode(parentNode) && !parentNode.computed) {
            return literalNode;
        }

        const numberNumericalExpressionData: TNumberNumericalExpressionData = this.numberNumericalExpressionAnalyzer.analyze(literalNode.value);

        return NumericalExpressionDataToNodeConverter.convert(
            numberNumericalExpressionData,
            (number: number, isPositiveNumber: boolean) => {
                const numberLiteralNode: ESTree.Literal = NodeFactory.literalNode(number);

                return isPositiveNumber
                    ? numberLiteralNode
                    : NodeFactory.unaryExpressionNode(
                        '-',
                        numberLiteralNode
                    );
            }
        );
    }
}
