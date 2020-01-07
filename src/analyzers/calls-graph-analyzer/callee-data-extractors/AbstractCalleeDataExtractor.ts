import { injectable } from 'inversify';

import * as ESTree from 'estree';

import { ICalleeData } from '../../../interfaces/analyzers/calls-graph-analyzer/ICalleeData';
import { ICalleeDataExtractor } from '../../../interfaces/analyzers/calls-graph-analyzer/ICalleeDataExtractor';

@injectable()
export abstract class AbstractCalleeDataExtractor implements ICalleeDataExtractor {
    /**
     * @param {Node[]} blockScopeBody
     * @param {Node} callee
     * @returns {ICalleeData}
     */
    public abstract extract (blockScopeBody: ESTree.Node[], callee: ESTree.Node): ICalleeData | null;
}
