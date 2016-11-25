import { ICustomNode } from './custom-nodes/ICustomNode';

export interface ICustomNodesFactory {
    /**
     * @returns {Map <string, ICustomNode> | undefined}
     */
    initializeCustomNodes (): Map <string, ICustomNode> | undefined;
}
