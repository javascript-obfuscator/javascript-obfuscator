import * as ESTree from 'estree';

import { AppendState } from 'app/enums/AppendState';

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
