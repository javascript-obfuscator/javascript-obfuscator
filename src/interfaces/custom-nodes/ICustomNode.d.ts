import * as ESTree from 'estree';

import { TObfuscationEvent } from '../../types/TObfuscationEvent';
import { TStatement } from '../../types/TStatement';

export interface ICustomNode {
    /**
     * @param astTree
     */
    appendNode (astTree: ESTree.Node): void;

    /**
     * @returns {TObfuscationEvent}
     */
    getAppendEvent (): TObfuscationEvent;

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
    setAppendEvent (appendState: TObfuscationEvent): void;
}
