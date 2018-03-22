import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ControlFlowCustomNode } from '../../../enums/custom-nodes/ControlFlowCustomNode';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class StringLiteralControlFlowReplacer extends AbstractControlFlowReplacer {
    /**
     * @type {number}
     */
    private static readonly usingExistingIdentifierChance: number = 1;

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
     * @param {Literal} literalNode
     * @param {NodeGuards} parentNode
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {NodeGuards}
     */
    public replace (
        literalNode: ESTree.Literal,
        parentNode: ESTree.Node,
        controlFlowStorage: TControlFlowStorage
    ): ESTree.Node {
        if (NodeGuards.isPropertyNode(parentNode) && parentNode.key === literalNode) {
            return literalNode;
        }

        if (typeof literalNode.value !== 'string' || literalNode.value.length < 3) {
            return literalNode;
        }

        const replacerId: string = String(literalNode.value);
        const literalFunctionCustomNode: ICustomNode = this.controlFlowCustomNodeFactory(
            ControlFlowCustomNode.StringLiteralNode
        );

        literalFunctionCustomNode.initialize(literalNode.value);

        const storageKey: string = this.insertCustomNodeToControlFlowStorage(
            literalFunctionCustomNode,
            controlFlowStorage,
            replacerId,
            StringLiteralControlFlowReplacer.usingExistingIdentifierChance
        );

        return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey);
    }

    /**
     * @param {string} controlFlowStorageId
     * @param {string} storageKey
     * @returns {NodeGuards}
     */
    protected getControlFlowStorageCallNode (
        controlFlowStorageId: string,
        storageKey: string
    ): ESTree.Node {
        const controlFlowStorageCallCustomNode: ICustomNode = this.controlFlowCustomNodeFactory(
            ControlFlowCustomNode.StringLiteralControlFlowStorageCallNode
        );

        controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey);

        const statementNode: TStatement = controlFlowStorageCallCustomNode.getNode()[0];

        if (!statementNode || !NodeGuards.isExpressionStatementNode(statementNode)) {
            throw new Error(`\`controlFlowStorageCallCustomNode.getNode()[0]\` should returns array with \`ExpressionStatement\` node`);
        }

        return statementNode.expression;
    }
}
