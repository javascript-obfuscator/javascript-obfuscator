import * as ESTree from 'estree';

import { TStatement } from '../../types/TStatement';

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
     * @returns {string}
     */
    getCode (): string;

    /**
     * @returns ESTree.Node[]
     */
    getNode (): TStatement[];

    /**
     * @param appendState
     */
    setAppendState (appendState: AppendState): void;
}
