import * as ESTree from 'estree';

import { IStackTraceData } from './IStackTraceData';

export interface IStackTraceAnalyzer {
    analyze (blockScopeBody: ESTree.Node[]): IStackTraceData[];
}
