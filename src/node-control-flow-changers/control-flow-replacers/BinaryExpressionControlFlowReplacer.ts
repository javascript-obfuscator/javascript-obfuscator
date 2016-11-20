import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { BinaryExpressionSumFunctionNode } from '../../custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionSumFunctionNode';
import { BinaryExpressionSubtractFunctionNode } from '../../custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionSubtractFunctionNode';
import { BinaryExpressionMultiplyFunctionNode } from '../../custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionMultiplyFunctionNode';
import { BinaryExpressionDivideFunctionNode } from '../../custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionDivideFunctionNode';
import { BinaryExpressionExponentiationFunctionNode } from '../../custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionExponentiationFunctionNode';
import { ControlFlowStorage } from '../../ControlFlowStorage';
import { ControlFlowStorageCallNode } from '../../custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/ControlFlowStorageCallNode';

export class BinaryExpressionControlFlowReplacer extends AbstractControlFlowReplacer {
    /**
     * @param expressionNode
     * @returns {string}
     */
    private static getExpressionValue (expressionNode: ESTree.Expression): string {
        return escodegen.generate(expressionNode, {
            sourceMapWithCode: true
        }).code;
    }

    /**
     * @param binaryExpressionNode
     * @param parentNode
     * @param controlFlowStorage
     * @param controlFlowStorageCustomNodeName
     * @returns {ICustomNode | undefined}
     */
    public replace (
        binaryExpressionNode: ESTree.BinaryExpression,
        parentNode: ESTree.Node,
        controlFlowStorage: ControlFlowStorage,
        controlFlowStorageCustomNodeName: string
    ): ICustomNode | undefined {
        let binaryExpressionFunctionNode: ICustomNode;

        switch (binaryExpressionNode.operator) {
            case '+':
                binaryExpressionFunctionNode = new BinaryExpressionSumFunctionNode(this.options);

                break;

            case '-':
                binaryExpressionFunctionNode = new BinaryExpressionSubtractFunctionNode(this.options);

                break;

            case '*':
                binaryExpressionFunctionNode = new BinaryExpressionMultiplyFunctionNode(this.options);

                break;

            case '/':
                binaryExpressionFunctionNode = new BinaryExpressionDivideFunctionNode(this.options);

                break;

            case '**':
                binaryExpressionFunctionNode = new BinaryExpressionExponentiationFunctionNode(this.options);

                break;

            default:
                return;
        }

        const key: string = AbstractControlFlowReplacer.getStorageKey();

        controlFlowStorage.addToStorage(key, binaryExpressionFunctionNode);

        return new ControlFlowStorageCallNode(
            controlFlowStorageCustomNodeName,
            key,
            BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.left),
            BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.right),
            this.options
        );
    }
}
