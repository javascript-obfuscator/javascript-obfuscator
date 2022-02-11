import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TInitialData } from '../../../types/TInitialData';
import { TStatement } from '../../../types/node/TStatement';

import { IControlFlowStorage } from '../../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ControlFlowCustomNode } from '../../../enums/custom-nodes/ControlFlowCustomNode';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { NodeGuards } from '../../../node/NodeGuards';
import { NodeLiteralUtils } from '../../../node/NodeLiteralUtils';
import { StringLiteralControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode';
import { LiteralNode } from '../../../custom-nodes/control-flow-flattening-nodes/LiteralNode';

@injectable()
export class StringLiteralControlFlowReplacer extends AbstractControlFlowReplacer {
    /**
     * @type {number}
     */
    protected static readonly usingExistingIdentifierChance: number = 1;

    /**
     * @param {TControlFlowCustomNodeFactory} controlFlowCustomNodeFactory
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IControlFlowCustomNode)
            controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            controlFlowCustomNodeFactory,
            identifierNamesGeneratorFactory,
            randomGenerator,
            options
        );
    }

    /**
     * @param {Literal} literalNode
     * @param {Node} parentNode
     * @param {IControlFlowStorage} controlFlowStorage
     * @returns {Node}
     */
    public replace (
        literalNode: ESTree.Literal,
        parentNode: ESTree.Node,
        controlFlowStorage: IControlFlowStorage
    ): ESTree.Node {
        if (NodeGuards.isPropertyNode(parentNode) && parentNode.key === literalNode) {
            return literalNode;
        }

        if (!NodeLiteralUtils.isStringLiteralNode(literalNode) || literalNode.value.length < 3) {
            return literalNode;
        }

        const replacerId: string = literalNode.value;
        const literalCustomNode: ICustomNode<TInitialData<LiteralNode>> =
            this.controlFlowCustomNodeFactory(ControlFlowCustomNode.LiteralNode);

        literalCustomNode.initialize(literalNode);

        const storageKey: string = this.insertCustomNodeToControlFlowStorage(
            literalCustomNode,
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
        const controlFlowStorageCallCustomNode: ICustomNode<TInitialData<StringLiteralControlFlowStorageCallNode>> =
            this.controlFlowCustomNodeFactory(ControlFlowCustomNode.StringLiteralControlFlowStorageCallNode);

        controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey);

        const statementNode: TStatement = controlFlowStorageCallCustomNode.getNode()[0];

        if (!statementNode || !NodeGuards.isExpressionStatementNode(statementNode)) {
            throw new Error('`controlFlowStorageCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node');
        }

        return statementNode.expression;
    }
}
