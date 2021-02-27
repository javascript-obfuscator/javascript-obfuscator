import * as ESTree from 'estree';

import { TNumericalExpressionDataToNodeConverterLiteralNodeGetter } from '../types/node/TNumericalExpressionDataToNodeConverterLiteralNodeGetter';
import { TNumberNumericalExpressionData } from '../types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';

import { NodeFactory } from './NodeFactory';
import { NumberUtils } from '../utils/NumberUtils';

/**
 * Converts NumberNumericalExpressionData to node
 */
export class NumericalExpressionDataToNodeConverter {
    /**
     * @param {TNumberNumericalExpressionData} numberNumericalExpressionData
     * @param {TNumericalExpressionDataToNodeConverterLiteralNodeGetter} literalNodeGetter
     * @returns {Expression}
     */
    public static convertIntegerNumberData (
        numberNumericalExpressionData: TNumberNumericalExpressionData,
        literalNodeGetter: TNumericalExpressionDataToNodeConverterLiteralNodeGetter
    ): ESTree.Expression {
       return NumericalExpressionDataToNodeConverter.convertNumericalExpressionDataToNode(
           numberNumericalExpressionData,
           literalNodeGetter
       );
    }

    /**
     * @param {TNumberNumericalExpressionData} integerNumberNumericalExpressionData
     * @param {number} decimalPart
     * @param {TNumericalExpressionDataToNodeConverterLiteralNodeGetter} literalNodeGetter
     * @returns {Expression}
     */
    public static convertFloatNumberData (
        integerNumberNumericalExpressionData: TNumberNumericalExpressionData,
        decimalPart: number,
        literalNodeGetter: TNumericalExpressionDataToNodeConverterLiteralNodeGetter
    ): ESTree.Expression {
        const integerNumberNumericalExpressionNode: ESTree.Expression = NumericalExpressionDataToNodeConverter
            .convertNumericalExpressionDataToNode(
                integerNumberNumericalExpressionData,
                literalNodeGetter
            );

        return NodeFactory.binaryExpressionNode(
            '+',
            integerNumberNumericalExpressionNode,
            NodeFactory.literalNode(decimalPart)
        );
    }

    /**
     * @param {TNumberNumericalExpressionData} numberNumericalExpressionData
     * @param {TNumericalExpressionDataToNodeConverterLiteralNodeGetter} literalNodeGetter
     * @param {BinaryOperator} operator
     * @returns {Expression}
     */
    private static convertNumericalExpressionDataToNode (
        numberNumericalExpressionData: TNumberNumericalExpressionData,
        literalNodeGetter: TNumericalExpressionDataToNodeConverterLiteralNodeGetter,
        operator: ESTree.BinaryOperator = '+'
    ): ESTree.Expression {
        const numberNumericalExpressionDataLength: number = numberNumericalExpressionData.length;

        const leftParts: TNumberNumericalExpressionData = numberNumericalExpressionDataLength > 1
            ? numberNumericalExpressionData.slice(0, numberNumericalExpressionDataLength - 1)
            : [numberNumericalExpressionData[0]];
        const rightParts: TNumberNumericalExpressionData = numberNumericalExpressionDataLength > 1
            ? numberNumericalExpressionData.slice(-1)
            : [];

        // trailing iterations
        if (rightParts.length) {
            return NumericalExpressionDataToNodeConverter
                .convertPartsToBinaryExpression(operator, leftParts, rightParts, literalNodeGetter);
        }

        const firstLeftPartOrNumber: number | number[] | null = leftParts[0] ?? null;

        // last iteration when only single left part is left
        return Array.isArray(firstLeftPartOrNumber)
            ? NumericalExpressionDataToNodeConverter.convertNumericalExpressionDataToNode(
                firstLeftPartOrNumber,
                literalNodeGetter,
                '*'
            )
            : NumericalExpressionDataToNodeConverter.convertPartOrNumberToLiteralNode(
                firstLeftPartOrNumber,
                literalNodeGetter
            );
    }

    /**
     * @param {BinaryOperator} operator
     * @param {TNumberNumericalExpressionData} leftParts
     * @param {TNumberNumericalExpressionData} rightParts
     * @param {TNumericalExpressionDataToNodeConverterLiteralNodeGetter} literalNodeGetter
     * @returns {BinaryExpression}
     */
    private static convertPartsToBinaryExpression (
        operator: ESTree.BinaryOperator,
        leftParts: TNumberNumericalExpressionData,
        rightParts: TNumberNumericalExpressionData,
        literalNodeGetter: TNumericalExpressionDataToNodeConverterLiteralNodeGetter
    ): ESTree.BinaryExpression {
        const rightPartOrNumber: number | number[] = rightParts[0];

        if (Array.isArray(rightPartOrNumber)) {
            // right part is array with multiply numbers
            return NodeFactory.binaryExpressionNode(
                operator,
                NumericalExpressionDataToNodeConverter.convertNumericalExpressionDataToNode(
                    leftParts,
                    literalNodeGetter
                ),
                NumericalExpressionDataToNodeConverter.convertNumericalExpressionDataToNode(
                    rightPartOrNumber,
                    literalNodeGetter,
                    '*'
                )
            );
        } else {
            // right part is number
            return NodeFactory.binaryExpressionNode(
                operator,
                NumericalExpressionDataToNodeConverter.convertNumericalExpressionDataToNode(
                    leftParts,
                    literalNodeGetter
                ),
                this.convertPartOrNumberToLiteralNode(
                    rightPartOrNumber,
                    literalNodeGetter
                )
            );
        }
    }

    /**
     * @param {number | number[]} partOrNumber
     * @param {TNumericalExpressionDataToNodeConverterLiteralNodeGetter} literalNodeGetter
     * @returns {Expression}
     */
    private static convertPartOrNumberToLiteralNode (
        partOrNumber: number | number[],
        literalNodeGetter: TNumericalExpressionDataToNodeConverterLiteralNodeGetter
    ): ESTree.Expression {
        const number: number = Array.isArray(partOrNumber)
            ? partOrNumber[0]
            : partOrNumber;
        const isPositiveNumber: boolean = NumberUtils.isPositive(number);
        const absoluteNumber: number = Math.abs(number);

        return literalNodeGetter(absoluteNumber, isPositiveNumber);
    }
}
