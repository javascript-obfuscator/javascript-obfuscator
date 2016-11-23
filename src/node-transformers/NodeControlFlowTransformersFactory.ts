import { TNodeTransformer } from '../types/TNodeTransformer';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeTransformer } from '../interfaces/INodeTransformer';
import { INodeTransformersFactory } from '../interfaces/INodeTransformersFactory';
import { IOptions } from '../interfaces/IOptions';

import { NodeType } from '../enums/NodeType';

import { FunctionControlFlowTransformer } from './node-control-flow-transformers/FunctionControlFlowTransformer';

export class NodeControlFlowTransformersFactory implements INodeTransformersFactory {
    /**
     * @type {Map<string, TNodeTransformer[]>}
     */
    private static readonly nodeControlFlowChangers: Map <string, TNodeTransformer[]> = new Map <string, TNodeTransformer[]> ([
        [NodeType.FunctionDeclaration, [FunctionControlFlowTransformer]],
        [NodeType.FunctionExpression, [FunctionControlFlowTransformer]]
    ]);

    /**
     * @type Map <string, AbstractCustomNode>
     */
    protected customNodes: Map <string, ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected options: IOptions;

    /**
     * @param customNodes
     * @param options
     */
    constructor(customNodes: Map <string, ICustomNode>, options: IOptions) {
        this.customNodes = customNodes;
        this.options = options;
    }

    /**
     * @param nodeType
     * @returns {INodeTransformer[]}
     */
    public initializeNodeTransformers (nodeType: string): INodeTransformer[] {
        const nodeObfuscators: TNodeTransformer[] = NodeControlFlowTransformersFactory.nodeControlFlowChangers.get(nodeType) || [];
        const instancesArray: INodeTransformer[] = [];

        nodeObfuscators.forEach((transformer: TNodeTransformer) => {
            instancesArray.push(
                new transformer(this.customNodes, this.options)
            );
        });

        return instancesArray;
    }
}
