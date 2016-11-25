import { TNodeTransformer } from '../types/TNodeTransformer';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeTransformer } from '../interfaces/INodeTransformer';
import { INodeTransformersFactory } from '../interfaces/INodeTransformersFactory';
import { IOptions } from '../interfaces/IOptions';
import { IStorage } from '../interfaces/IStorage';

export abstract class AbstractNodeTransformersFactory implements INodeTransformersFactory {
    /**
     * @type {Map<string, TNodeTransformer[]>}
     */
    protected abstract readonly nodeTransformers: Map <string, TNodeTransformer[]>;

    /**
     * @type IStorage<ICustomNode>
     */
    protected readonly customNodesStorage: IStorage<ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @param customNodesStorage
     * @param options
     */
    constructor (customNodesStorage: IStorage<ICustomNode>, options: IOptions) {
        this.customNodesStorage = customNodesStorage;
        this.options = options;
    }

    /**
     * @param nodeType
     * @returns {INodeTransformer[]}
     */
    public initializeNodeTransformers (nodeType: string): INodeTransformer[] {
        const nodeTransformers: TNodeTransformer[] = this.nodeTransformers.get(nodeType) || [];
        const instancesArray: INodeTransformer[] = [];

        nodeTransformers.forEach((transformer: TNodeTransformer) => {
            instancesArray.push(
                new transformer(this.customNodesStorage, this.options)
            );
        });

        return instancesArray;
    }
}
