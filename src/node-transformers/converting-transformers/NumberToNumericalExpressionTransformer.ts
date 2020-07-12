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
import { NumberUtils } from '../../utils/NumberUtils';

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

        return this.convertNumericalExpressionDataToNode(numberNumericalExpressionData);
    }

    /**
     * @param {TNumberNumericalExpressionData} numberNumericalExpressionData
     * @param {ESTree.BinaryOperator} operator
     * @returns {ESTree.BinaryExpression | ESTree.Literal | ESTree.UnaryExpression}
     */
    private convertNumericalExpressionDataToNode (
        numberNumericalExpressionData: TNumberNumericalExpressionData,
        operator: ESTree.BinaryOperator = '+'
    ): ESTree.BinaryExpression | ESTree.Literal | ESTree.UnaryExpression {
        const numberNumericalExpressionDataLength: number = numberNumericalExpressionData.length;

        const leftParts: TNumberNumericalExpressionData = numberNumericalExpressionDataLength > 1
            ? numberNumericalExpressionData.slice(0, numberNumericalExpressionDataLength - 1)
            : [numberNumericalExpressionData[0]];
        const rightParts: TNumberNumericalExpressionData = numberNumericalExpressionDataLength > 1
            ? numberNumericalExpressionData.slice(-1)
            : [];

        // trailing iterations
        if (rightParts.length) {
            return this.convertPartsToBinaryExpression(operator, leftParts, rightParts);
        }

        const firstLeftPartOrNumber: number | number[] | null = leftParts[0] ?? null;

        // last iteration when only single left part is left
        return Array.isArray(firstLeftPartOrNumber)
            ? this.convertNumericalExpressionDataToNode(firstLeftPartOrNumber, '*')
            : this.convertPartOrNumberToLiteralNode(firstLeftPartOrNumber);
    }

    /**
     * @param {ESTree.BinaryOperator} operator
     * @param {TNumberNumericalExpressionData} leftParts
     * @param {TNumberNumericalExpressionData} rightParts
     * @returns {ESTree.BinaryExpression}
     */
    private convertPartsToBinaryExpression (
        operator: ESTree.BinaryOperator,
        leftParts: TNumberNumericalExpressionData,
        rightParts: TNumberNumericalExpressionData
    ): ESTree.BinaryExpression {
        const rightPartOrNumber: number | number[] = rightParts[0];

        if (Array.isArray(rightPartOrNumber)) {
            // right part is array with multiply numbers
            return NodeFactory.binaryExpressionNode(
                operator,
                this.convertNumericalExpressionDataToNode(leftParts),
                this.convertNumericalExpressionDataToNode(rightPartOrNumber, '*')
            );
        } else {
            // right part is number
            return NodeFactory.binaryExpressionNode(
                operator,
                this.convertNumericalExpressionDataToNode(leftParts),
                this.convertPartOrNumberToLiteralNode(rightPartOrNumber)
            );
        }
    }

    /**
     * @param {number | number[]} partOrNumber
     * @returns {ESTree.Literal}
     */
    private convertPartOrNumberToLiteralNode (
        partOrNumber: number | number[]
    ): ESTree.Literal | ESTree.UnaryExpression {
        const number: number = Array.isArray(partOrNumber)
            ? partOrNumber[0]
            : partOrNumber;
        const isPositiveNumber: boolean = NumberUtils.isPositive(number);

        const literalNode: ESTree.Literal = NodeFactory.literalNode(Math.abs(number));

        return isPositiveNumber
            ? literalNode
            : NodeFactory.unaryExpressionNode(
                '-',
                literalNode
            );
    }
}
