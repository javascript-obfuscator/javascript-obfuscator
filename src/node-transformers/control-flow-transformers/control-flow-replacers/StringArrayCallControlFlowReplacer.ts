import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TInitialData } from '../../../types/TInitialData';

import { IControlFlowStorage } from '../../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ControlFlowCustomNode } from '../../../enums/custom-nodes/ControlFlowCustomNode';

import { NodeMetadata } from '../../../node/NodeMetadata';
import { StringLiteralControlFlowReplacer } from './StringLiteralControlFlowReplacer';
import { StringLiteralNode } from '../../../custom-nodes/control-flow-flattening-nodes/StringLiteralNode';
import { NodeLiteralUtils } from '../../../node/NodeLiteralUtils';

@injectable()
export class StringArrayCallControlFlowReplacer extends StringLiteralControlFlowReplacer {
    /**
     * @type {number}
     */
    protected static override readonly usingExistingIdentifierChance: number = 0.5;

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
    public override replace (
        literalNode: ESTree.Literal,
        parentNode: ESTree.Node,
        controlFlowStorage: IControlFlowStorage
    ): ESTree.Node {
        const isStringArrayCallLiteralNode = NodeMetadata.isStringArrayCallLiteralNode(literalNode)
            && (
                NodeLiteralUtils.isNumberLiteralNode(literalNode)
                || NodeLiteralUtils.isStringLiteralNode(literalNode)
            );

        if (!isStringArrayCallLiteralNode) {
            return literalNode;
        }

        const replacerId: string = String(literalNode.value);
        const literalFunctionCustomNode: ICustomNode<TInitialData<StringLiteralNode>> =
            this.controlFlowCustomNodeFactory(ControlFlowCustomNode.StringLiteralNode);

        literalFunctionCustomNode.initialize(literalNode.value);

        const storageKey: string = this.insertCustomNodeToControlFlowStorage(
            literalFunctionCustomNode,
            controlFlowStorage,
            replacerId,
            StringArrayCallControlFlowReplacer.usingExistingIdentifierChance
        );

        return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey);
    }

    /**
     * Generates storage key based on a current control flow storage identifier
     *
     * @param {IControlFlowStorage} controlFlowStorage
     * @returns {string}
     */
    public override generateStorageKey (controlFlowStorage: IControlFlowStorage): string {
        const key: string = this.identifierNamesGenerator
            .generateForLabel(controlFlowStorage.getStorageId());

        if (controlFlowStorage.has(key)) {
            return this.generateStorageKey(controlFlowStorage);
        }

        return key;
    }
}
