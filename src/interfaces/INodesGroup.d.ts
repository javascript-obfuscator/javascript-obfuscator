import { ICustomNode } from './custom-nodes/ICustomNode';

export interface INodesGroup {
    /**
     * @returns {Map <string, ICustomNode>}
     */
    getNodes (): Map <string, ICustomNode>;
}
