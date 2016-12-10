import * as ESTree from 'estree';

import { IStackTraceData } from './IStackTraceData';

export interface IStackTraceAnalyzer {
    /**
     * @param blockScopeBody
     * @returns IStackTraceData[]
     */
    analyze (blockScopeBody: ESTree.Node[]): IStackTraceData[];
}
