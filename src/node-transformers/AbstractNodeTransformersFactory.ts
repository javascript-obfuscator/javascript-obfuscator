import { TNodeTransformer } from '../types/TNodeTransformer';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeTransformer } from '../interfaces/INodeTransformer';
import { INodeTransformersFactory } from '../interfaces/INodeTransformersFactory';
import { IOptions } from '../interfaces/IOptions';

export abstract class AbstractNodeTransformersFactory implements INodeTransformersFactory {
    /**
     * @type {Map<string, TNodeTransformer[]>}
     */
    protected abstract readonly nodeTransformers: Map <string, TNodeTransformer[]>;

    /**
     * @type Map <string, AbstractCustomNode>
     */
    protected readonly customNodes: Map <string, ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @param customNodes
     * @param options
     */
    constructor (customNodes: Map <string, ICustomNode>, options: IOptions) {
        this.customNodes = customNodes;
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
                new transformer(this.customNodes, this.options)
            );
        });

        return instancesArray;
    }
}
