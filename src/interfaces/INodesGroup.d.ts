import { ICustomNode } from './ICustomNode';

export interface INodesGroup {
    /**
     * @returns {Map <string, ICustomNode>}
     */
    getNodes (): Map <string, ICustomNode>;
}
