import { INode } from '../interfaces/INode';

import { INodesGroup } from '../interfaces/INodesGroup';

export abstract class NodesGroup implements INodesGroup {
    /**
     * @type {Map<string, Node>}
     */
    protected nodes: Map <string, INode>;

    /**
     * @returns {Map<string, INode>}
     */
    public getNodes (): Map <string, INode> {
        return this.nodes;
    }
}
