import * as ESTree from 'estree';

import { IAnalyzer } from '../IAnalyzer';
import { ICallsGraphData } from './ICallsGraphData';

export interface ICallsGraphAnalyzer extends IAnalyzer<ICallsGraphData[]> {
    /**
     * @param {Program} astTree
     * @returns {ICallsGraphData[]}
     */
    analyze (astTree: ESTree.Program): ICallsGraphData[];
}
