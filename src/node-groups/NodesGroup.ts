import { ICustomNode } from '../interfaces/ICustomNode';

import { INodesGroup } from '../interfaces/INodesGroup';

export abstract class NodesGroup implements INodesGroup {
    /**
     * @type {Map<string, Node>}
     */
    protected nodes: Map <string, ICustomNode>;

    /**
     * @returns {Map<string, INode>}
     */
    public getNodes (): Map <string, ICustomNode> {
        return this.nodes;
    }
}
