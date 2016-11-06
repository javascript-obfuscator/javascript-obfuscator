import { ICustomNode } from './custom-nodes/ICustomNode';

export interface INodesGroup {
    /**
     * @returns {Map <string, ICustomNode> | undefined}
     */
    getNodes (): Map <string, ICustomNode> | undefined;
}
