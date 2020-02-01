import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';

import { IControlFlowReplacer } from '../../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

@injectable()
export abstract class AbstractControlFlowReplacer implements IControlFlowReplacer {
    /**
     * @type {TControlFlowCustomNodeFactory}
     */
    protected readonly controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory;

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
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IControlFlowCustomNode)
            controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param {Map<string, Map<string, string[]>>} identifierDataByControlFlowStorageId
     * @param {string} controlFlowStorageId
     * @returns {Map<string, string[]>}
     */
    protected static getStorageKeysByIdForCurrentStorage (
        identifierDataByControlFlowStorageId: Map<string, Map<string, string[]>>,
        controlFlowStorageId: string
    ): Map<string, string[]> {
        let storageKeysById: Map<string, string[]>;

        if (identifierDataByControlFlowStorageId.has(controlFlowStorageId)) {
            storageKeysById = <Map<string, string[]>>identifierDataByControlFlowStorageId.get(controlFlowStorageId);
        } else {
            storageKeysById = new Map <string, string[]>();
        }

        return storageKeysById;
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
        const storageKeysById: Map<string, string[]> = AbstractControlFlowReplacer
            .getStorageKeysByIdForCurrentStorage(this.replacerDataByControlFlowStorageId, controlFlowStorageId);
        const storageKeysForCurrentId: string[] | undefined = storageKeysById.get(replacerId);

        if (
            this.randomGenerator.getMathRandom() < usingExistingIdentifierChance &&
            storageKeysForCurrentId &&
            storageKeysForCurrentId.length
        ) {
            return this.randomGenerator.getRandomGenerator().pickone(storageKeysForCurrentId);
        }

        const generateStorageKey: (length: number) => string = (length: number) => {
            const key: string = this.randomGenerator.getRandomString(length);

            if (controlFlowStorage.getStorage().has(key)) {
                return generateStorageKey(length);
            }

            return key;
        };
        const storageKey: string = generateStorageKey(5);

        storageKeysById.set(replacerId, [storageKey]);
        this.replacerDataByControlFlowStorageId.set(controlFlowStorageId, storageKeysById);
        controlFlowStorage.set(storageKey, customNode);

        return storageKey;
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {Node}
     */
    public abstract replace (node: ESTree.Node, parentNode: ESTree.Node, controlFlowStorage: TControlFlowStorage): ESTree.Node;
}
