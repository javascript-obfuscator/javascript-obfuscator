import * as ESTree from 'estree';

import { ICalleeData } from './ICalleeData';

export interface ICalleeDataExtractor {
    extract (blockScopeBody: ESTree.Node[], callee: ESTree.Node): ICalleeData|null;
}
