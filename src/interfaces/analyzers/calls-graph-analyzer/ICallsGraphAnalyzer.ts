import * as ESTree from 'estree';

import { IAnalyzer } from '../IAnalyzer';
import { ICallsGraphData } from './ICallsGraphData';

export interface ICallsGraphAnalyzer extends IAnalyzer<[ESTree.Program], ICallsGraphData[]> {
    /**
     * @param {Program} astTree
     * @returns {ICallsGraphData[]}
     */
    analyze (astTree: ESTree.Program): ICallsGraphData[];
}
