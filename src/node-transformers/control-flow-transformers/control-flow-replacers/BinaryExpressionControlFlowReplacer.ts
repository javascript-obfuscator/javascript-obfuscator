import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../../types/container/custom-nodes/TCustomNodeFactory';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { CustomNode } from '../../../enums/container/custom-nodes/CustomNode';

import { ExpressionWithOperatorControlFlowReplacer } from './ExpressionWithOperatorControlFlowReplacer';

@injectable()
export class BinaryExpressionControlFlowReplacer extends ExpressionWithOperatorControlFlowReplacer {
    /**
     * @type {number}
     */
    private static readonly usingExistingIdentifierChance: number = 0.5;

    /**
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodeFactory, options);
    }

    /**
     * @param binaryExpressionNode
     * @param parentNode
     * @param controlFlowStorage
     * @returns {ESTree.Node}
     */
    public replace (
        binaryExpressionNode: ESTree.BinaryExpression,
        parentNode: ESTree.Node,
        controlFlowStorage: IStorage <ICustomNode>
    ): ESTree.Node {
        const replacerId: string = binaryExpressionNode.operator;
        const binaryExpressionFunctionCustomNode: ICustomNode = this.customNodeFactory(CustomNode.BinaryExpressionFunctionNode);

        binaryExpressionFunctionCustomNode.initialize(replacerId);

        const storageKey: string = this.insertCustomNodeToControlFlowStorage(
            binaryExpressionFunctionCustomNode,
            controlFlowStorage,
            replacerId,
            BinaryExpressionControlFlowReplacer.usingExistingIdentifierChance
        );

        return this.getControlFlowStorageCallNode(
            controlFlowStorage.getStorageId(),
            storageKey,
            binaryExpressionNode.left,
            binaryExpressionNode.right
        );
    }
}
