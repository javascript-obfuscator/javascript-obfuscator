import * as ESTree from 'estree';

import { IAnalyzer } from '../IAnalyzer';
import { IStackTraceData } from './IStackTraceData';

export interface IStackTraceAnalyzer extends IAnalyzer {
    /**
     * @param {Program} astTree
     * @returns {IStackTraceData[]}
     */
    analyze (astTree: ESTree.Program): IStackTraceData[];
}
