import * as ESTree from 'estree';

import { ICalleeData } from './ICalleeData';

export interface ICalleeDataExtractor {
    /**
     * @param blockScopeBody
     * @param callee
     * @returns ICalleeData|null
     */
    extract (blockScopeBody: ESTree.Node[], callee: ESTree.Node): ICalleeData | null;
}
