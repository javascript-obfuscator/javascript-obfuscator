import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeObfuscator } from '../interfaces/INodeObfuscator';
import { INode } from "../interfaces/nodes/INode";
import { IOptions } from "../interfaces/IOptions";

export abstract class AbstractNodeObfuscator implements INodeObfuscator {
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
    public abstract obfuscateNode (node: INode, parentNode?: INode): void;
}
