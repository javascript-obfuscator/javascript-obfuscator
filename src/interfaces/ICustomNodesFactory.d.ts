import { ICustomNode } from './custom-nodes/ICustomNode';

export interface ICustomNodesFactory {
    /**
     * @returns {Map <string, ICustomNode> | undefined}
     */
    getNodes (): Map <string, ICustomNode> | undefined;
}
