import * as ESTree from 'estree';

import { IAnalyzer } from '../IAnalyzer';
import { IStackTraceData } from './IStackTraceData';

export interface IStackTraceAnalyzer extends IAnalyzer {
    /**
     * @param blockScopeBody
     * @returns IStackTraceData[]
     */
    analyze (blockScopeBody: ESTree.Node[]): IStackTraceData[];
}
