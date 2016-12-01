import * as ESTree from 'estree';

import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';
import { IStackTraceData } from '../stack-trace-analyzer/IStackTraceData';
import { TStatement } from '../../types/node/TStatement';

import { IInitializable } from '../IInitializable';

export interface ICustomNode extends IInitializable {
    /**
     * @param astTree
     * @param stackTraceData
     */
    appendNode (astTree: ESTree.Node, stackTraceData: IStackTraceData[]): void;

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
