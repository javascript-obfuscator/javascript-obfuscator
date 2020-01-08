import * as ESTree from 'estree';

export interface IAnalyzer <T> {
    /**
     * @param {Program} astTree
     * @returns {T}
     */
    analyze (astTree: ESTree.Program): T;
}
