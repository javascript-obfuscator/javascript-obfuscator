import * as ESTree from 'estree';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeControlFlowChanger } from '../interfaces/INodeControlFlowChanger';
import { IOptions } from '../interfaces/IOptions';

export abstract class AbstractNodeControlFlowChanger implements INodeControlFlowChanger {
    /**
     * @type Map <string, AbstractCustomNode>
     */
    protected nodes: Map <string, ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected options: IOptions;

    /**
     * @param nodes
     * @param options
     */
    constructor(nodes: Map <string, ICustomNode>, options: IOptions) {
        this.nodes = nodes;
        this.options = options;
    }

    /**
     * @param node
     * @param parentNode
     */
    public abstract changeControlFlow (node: ESTree.Node, parentNode?: ESTree.Node): void;
}
