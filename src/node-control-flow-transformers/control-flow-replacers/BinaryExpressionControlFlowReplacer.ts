import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { BinaryExpressionFunctionNode } from '../../custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionFunctionNode';
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
        const key: string = AbstractControlFlowReplacer.getStorageKey();

        controlFlowStorage.addToStorage(key, new BinaryExpressionFunctionNode(binaryExpressionNode.operator, this.options));

        return new ControlFlowStorageCallNode(
            controlFlowStorageCustomNodeName,
            key,
            BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.left),
            BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.right),
            this.options
        );
    }
}
