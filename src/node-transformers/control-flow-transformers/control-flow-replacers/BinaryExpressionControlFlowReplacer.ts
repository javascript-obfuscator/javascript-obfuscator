import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ControlFlowCustomNode } from '../../../enums/custom-nodes/ControlFlowCustomNode';

import { ExpressionWithOperatorControlFlowReplacer } from './ExpressionWithOperatorControlFlowReplacer';

@injectable()
export class BinaryExpressionControlFlowReplacer extends ExpressionWithOperatorControlFlowReplacer {
    /**
     * @type {number}
     */
    private static readonly usingExistingIdentifierChance: number = 0.5;

    /**
     * @param {TControlFlowCustomNodeFactory} controlFlowCustomNodeFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IControlFlowCustomNode)
            controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(controlFlowCustomNodeFactory, randomGenerator, options);
    }

    /**
     * @param {BinaryExpression} binaryExpressionNode
     * @param {Node} parentNode
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {Node}
     */
    public replace (
        binaryExpressionNode: ESTree.BinaryExpression,
        parentNode: ESTree.Node,
        controlFlowStorage: TControlFlowStorage
    ): ESTree.Node {
        const replacerId: string = binaryExpressionNode.operator;
        const binaryExpressionFunctionCustomNode: ICustomNode = this.controlFlowCustomNodeFactory(
            ControlFlowCustomNode.BinaryExpressionFunctionNode
        );

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
