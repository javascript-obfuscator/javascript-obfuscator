import * as ESTree from 'estree';

export interface IAnalyzer {
    /**
     * @param blockScopeBody
     * @returns any
     */
    analyze (blockScopeBody: ESTree.Node[]): any;
}
