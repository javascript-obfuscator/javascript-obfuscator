import { INode } from '../interfaces/nodes/INode';

import { AppendState } from '../enums/AppendState';

export interface ICustomNode {
    /**
     * @param astTree
     */
    appendNode (astTree: INode): void;

    /**
     * @returns {AppendState}
     */
    getAppendState (): AppendState;

    /**
     * @returns INode
     */
    getNode (): INode;

    /**
     * @returns {string}
     */
    getNodeIdentifier ? (): string;

    /**
     * @returns any
     */
    getNodeData ? (): any;

    /**
     * @param data
     */
    updateNodeData ? (data: any): void;
}
