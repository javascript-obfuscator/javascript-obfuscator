import { ITreeNode } from '../interfaces/nodes/ITreeNode';

import { AppendState } from '../enums/AppendState';

export interface INode {
    appendNode (): void;

    /**
     * @returns {AppendState}
     */
    getAppendState (): AppendState;

    /**
     * @returns ITreeNode
     */
    getNode (): ITreeNode;

    /**
     * @returns {string}
     */
    getNodeIdentifier ? (): string;

    /**
     * @returns any
     */
    getNodeData ? (): any;

    /**
     * @param node
     */
    setNode (node: ITreeNode): void;

    updateNode (): void;
}
