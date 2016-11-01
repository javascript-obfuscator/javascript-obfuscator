import * as ESTree from 'estree';

import { TStatement } from '../../types/TStatement';

import { IStackTraceData } from '../stack-trace-analyzer/IStackTraceData';

import { AppendState } from '../../enums/AppendState';

export interface ICustomNode {
    /**
     * @param astTree
     * @param stackTraceData
     */
    appendNode (astTree: ESTree.Node, stackTraceData?: IStackTraceData[]): void;

    /**
     * @returns {AppendState}
     */
    getAppendState (): AppendState;

    /**
     * @returns ESTree.Node[]
     */
    getNode (): TStatement[];
}
