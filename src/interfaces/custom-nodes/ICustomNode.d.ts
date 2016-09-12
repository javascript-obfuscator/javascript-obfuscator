import * as ESTree from 'estree';

import { AppendState } from '../../enums/AppendState';

export interface ICustomNode {
    /**
     * @param astTree
     */
    appendNode (astTree: ESTree.Node): void;

    /**
     * @returns {AppendState}
     */
    getAppendState (): AppendState;

    /**
     * @returns INode
     */
    getNode (): ESTree.Node;
}
