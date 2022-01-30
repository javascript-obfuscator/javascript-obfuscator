import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';

import { IControlFlowReplacer } from '../../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IIdentifierNamesGenerator } from '../../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

@injectable()
export abstract class AbstractControlFlowReplacer implements IControlFlowReplacer {
    /**
     * @type {TControlFlowCustomNodeFactory}
     */
    protected readonly controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory;

    /**
     * @type {IIdentifierNamesGenerator}
     */
    protected readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @type {Map<string, Map<string, string[]>>}
     */
    protected readonly replacerDataByControlFlowStorageId: Map <string, Map<string, string[]>> = new Map();

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
        this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * Generates storage key with length of 5 characters to prevent collisions and to guarantee that
     * these keys will be added to the string array storage
     *
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {string}
     */
    public generateStorageKey (controlFlowStorage: TControlFlowStorage): string {
        const key: string = this.randomGenerator.getRandomString(5);

        if (controlFlowStorage.has(key)) {
            return this.generateStorageKey(controlFlowStorage);
        }

        return key;
    }

    /**
     * @param {ICustomNode} customNode
     * @param {TControlFlowStorage} controlFlowStorage
     * @param {string} replacerId
     * @param {number} usingExistingIdentifierChance
     * @returns {string}
     */
    protected insertCustomNodeToControlFlowStorage (
        customNode: ICustomNode,
        controlFlowStorage: TControlFlowStorage,
        replacerId: string,
        usingExistingIdentifierChance: number
    ): string {
        const controlFlowStorageId: string = controlFlowStorage.getStorageId();
        const storageKeysById: Map<string, string[]> = this.replacerDataByControlFlowStorageId.get(controlFlowStorageId)
            ?? new Map <string, string[]>();
        const storageKeysForCurrentId: string[] | null = storageKeysById.get(replacerId) ?? null;

        const shouldPickFromStorageKeysById = this.randomGenerator.getMathRandom() < usingExistingIdentifierChance
            && storageKeysForCurrentId?.length;

        if (shouldPickFromStorageKeysById) {
            return this.randomGenerator.getRandomGenerator().pickone(storageKeysForCurrentId);
        }

        const storageKey: string = this.generateStorageKey(controlFlowStorage);

        storageKeysById.set(replacerId, [storageKey]);
        this.replacerDataByControlFlowStorageId.set(controlFlowStorageId, storageKeysById);
        controlFlowStorage.set(storageKey, customNode);

        return storageKey;
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @param {TNodeWithLexicalScope} controlFlowStorageLexicalScopeNode
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {Node}
     */
    public abstract replace (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        controlFlowStorage: TControlFlowStorage
    ): ESTree.Node;
}
