import 'reflect-metadata';

import * as ESTree from 'estree';

import { assert } from 'chai';

import { TNumberNumericalExpressionData } from '../../../../src/types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';

import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NumericalExpressionDataToNodeConverter } from '../../../../src/node/NumericalExpressionDataToNodeConverter';

describe('NumericalExpressionDataToNodeConverter', () => {
    describe('convertIntegerNumberData', () => {
        describe('Variant #1: base', () => {
            const numberNumericalExpressionData: TNumberNumericalExpressionData = [
                1, [-2, 3], 4
            ];

            const expectedExpressionNode: ESTree.Expression = NodeFactory.binaryExpressionNode(
                '+',
                NodeFactory.binaryExpressionNode(
                    '+',
                    NodeFactory.literalNode(1),
                    NodeFactory.binaryExpressionNode(
                        '*',
                        NodeFactory.unaryExpressionNode(
                            '-',
                            NodeFactory.literalNode(2),
                        ),
                        NodeFactory.literalNode(3)
                    ),
                ),
                NodeFactory.literalNode(4)
            );

            let expressionNode: ESTree.Expression;

            before(() => {
                expressionNode = NumericalExpressionDataToNodeConverter.convertIntegerNumberData(
                    numberNumericalExpressionData,
                    (number: number, isPositiveNumber: boolean): ESTree.Expression => {
                        const numberLiteralNode: ESTree.Literal = NodeFactory.literalNode(number);

                        return isPositiveNumber
                            ? numberLiteralNode
                            : NodeFactory.unaryExpressionNode(
                                '-',
                                numberLiteralNode
                            );
                    }
                );
            });

            it('should convert number numerical expression data to expression node', () => {
                assert.deepEqual(expressionNode, expectedExpressionNode);
            });
        });
    });

    describe('convertFloatNumberData', () => {
        describe('Variant #1: base', () => {
            const integerNumberNumericalExpressionData: TNumberNumericalExpressionData = [
                1, [-2, 3], 4
            ];
            const decimalPart: number = 0.000000001;

            const expectedExpressionNode: ESTree.Expression = NodeFactory.binaryExpressionNode(
                '+',
                NodeFactory.binaryExpressionNode(
                    '+',
                    NodeFactory.binaryExpressionNode(
                        '+',
                        NodeFactory.literalNode(1),
                        NodeFactory.binaryExpressionNode(
                            '*',
                            NodeFactory.unaryExpressionNode(
                                '-',
                                NodeFactory.literalNode(2),
                            ),
                            NodeFactory.literalNode(3)
                        ),
                    ),
                    NodeFactory.literalNode(4)
                ),
                NodeFactory.literalNode(decimalPart)
            );

            let expressionNode: ESTree.Expression;

            before(() => {
                expressionNode = NumericalExpressionDataToNodeConverter.convertFloatNumberData(
                    integerNumberNumericalExpressionData,
                    decimalPart,
                    (number: number, isPositiveNumber: boolean): ESTree.Expression => {
                        const numberLiteralNode: ESTree.Literal = NodeFactory.literalNode(number);

                        return isPositiveNumber
                            ? numberLiteralNode
                            : NodeFactory.unaryExpressionNode(
                                '-',
                                numberLiteralNode
                            );
                    }
                );
            });

            it('should convert number numerical expression data to expression node', () => {
                assert.deepEqual(expressionNode, expectedExpressionNode);
            });
        });
    });
});
