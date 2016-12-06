import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { BinaryExpressionFunctionNode } from '../../../custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionFunctionNode';
import { ControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/ControlFlowStorageCallNode';

@injectable()
export class BinaryExpressionControlFlowReplacer extends AbstractControlFlowReplacer {
    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

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
     * @returns {ICustomNode}
     */
    public replace (
        binaryExpressionNode: ESTree.BinaryExpression,
        parentNode: ESTree.Node,
        controlFlowStorage: IStorage <ICustomNode>,
        controlFlowStorageCustomNodeName: string
    ): ICustomNode {
        const key: string = AbstractControlFlowReplacer.getStorageKey();
        const binaryExpressionFunctionNode = new BinaryExpressionFunctionNode(this.options);

        // TODO: pass through real stackTraceData
        binaryExpressionFunctionNode.initialize(binaryExpressionNode.operator);

        controlFlowStorage.set(key, binaryExpressionFunctionNode);

        const controlFlowStorageCallNode: ICustomNode = new ControlFlowStorageCallNode(this.options);

        controlFlowStorageCallNode.initialize(
            controlFlowStorageCustomNodeName,
            key,
            BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.left),
            BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.right)
        );

        return controlFlowStorageCallNode;
    }
}
