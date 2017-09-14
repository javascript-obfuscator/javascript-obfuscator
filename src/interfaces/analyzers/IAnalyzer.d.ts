import * as ESTree from 'estree';
import { TObject } from '../../types/TObject';

export interface IAnalyzer {
    /**
     * @param {Program} astTree
     * @returns {TObject[]}
     */
    analyze (astTree: ESTree.Program): TObject[];
}
