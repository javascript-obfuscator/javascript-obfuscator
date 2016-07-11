import { INode } from '../nodes/INode';

import { AppendState } from '../../enums/AppendState';

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
}
