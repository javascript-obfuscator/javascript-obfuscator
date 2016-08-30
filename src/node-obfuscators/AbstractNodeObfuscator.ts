import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeObfuscator } from '../interfaces/INodeObfuscator';
import { INode } from "../interfaces/nodes/INode";
import { IOptions } from "../interfaces/IOptions";

import { Nodes } from "../Nodes";
import { Utils } from '../Utils';

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

    /**
     * @param name
     * @returns {boolean}
     */
    protected isReservedName (name: string): boolean {
        return this.options.reservedNames
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').test(name);
            });
    }

    /**
     * Store all identifiers names as keys in given `namesMap` with random names as value.
     * Reserved names will be ignored.
     *
     * @param node
     * @param namesMap
     */
    protected storeIdentifiersNames (
        node: INode,
        namesMap: Map <string, string>
    ): void {
        if (Nodes.isIdentifierNode(node) && !this.isReservedName(node.name)) {
            namesMap.set(node.name, Utils.getRandomVariableName());
        }
    }
}
