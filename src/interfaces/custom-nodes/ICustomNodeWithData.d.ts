import { ICustomNode } from './ICustomNode';

export interface ICustomNodeWithData extends ICustomNode {
    /**
     * @returns any
     */
    getNodeData (): any;
}
