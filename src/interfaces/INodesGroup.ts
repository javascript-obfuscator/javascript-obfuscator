import { INode } from './INode';

export interface INodesGroup {
    /**
     * @returns {Map <string, INode>}
     */
    getNodes (): Map <string, INode>;
}