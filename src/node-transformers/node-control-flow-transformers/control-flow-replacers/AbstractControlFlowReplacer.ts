import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IControlFlowReplacer } from '../../../interfaces/IControlFlowReplacer';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/IOptions';
import { IStorage } from '../../../interfaces/IStorage';

import { Utils } from '../../../Utils';

@injectable()
export abstract class AbstractControlFlowReplacer implements IControlFlowReplacer {
    /**
     * @type IStorage<ICustomNode>
     */
    protected readonly customNodesStorage: IStorage<ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected readonly options : IOptions;

    /**
     * @param customNodesStorage
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.customNodesStorage = customNodesStorage;
        this.options = options;
    }

    /**
     * @returns {string}
     */
    protected static getStorageKey (): string {
        return Utils.getRandomGenerator().string({
            length: 3,
            pool: Utils.randomGeneratorPool
        });
    }

    /**
     * @param node
     * @param parentNode
     * @param controlFlowStorage
     * @param controlFlowStorageCustomNodeName
     * @returns {ICustomNode | undefined}
     */
    public abstract replace (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        controlFlowStorage: IStorage <ICustomNode>,
        controlFlowStorageCustomNodeName: string
    ): ICustomNode | undefined;
}
