import 'reflect-metadata';

import * as ESTree from 'estree';

import { assert } from 'chai';

import { TNumberNumericalExpressionData } from '../../../../src/types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';

import { NodeFactory } from '../../../../src/node/NodeFactory';
import { NumericalExpressionDataToNodeConverter } from '../../../../src/node/NumericalExpressionDataToNodeConverter';

describe('NumericalExpressionDataToNodeConverter', () => {
    describe('Variant #1: base', () => {
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
        const numberNumericalExpressionData: TNumberNumericalExpressionData = [
            1, [-2, 3], 4
        ];

        let expressionNode: ESTree.Expression;

        before(() => {
            expressionNode = NumericalExpressionDataToNodeConverter.convert(
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
