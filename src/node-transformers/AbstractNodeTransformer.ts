import * as ESTree from 'estree';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeTransformer } from '../interfaces/INodeTransformer';
import { IOptions } from '../interfaces/IOptions';

export abstract class AbstractNodeTransformer implements INodeTransformer {
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
    public abstract transformNode (node: ESTree.Node, parentNode?: ESTree.Node): void;
}
