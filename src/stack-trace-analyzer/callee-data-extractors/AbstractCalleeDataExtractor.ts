import { injectable } from 'inversify';

import * as ESTree from 'estree';

import { ICalleeData } from '../../interfaces/stack-trace-analyzer/ICalleeData';
import { ICalleeDataExtractor } from '../../interfaces/stack-trace-analyzer/ICalleeDataExtractor';

@injectable()
export abstract class AbstractCalleeDataExtractor implements ICalleeDataExtractor {
    /**
     * @param blockScopeBody
     * @param callee
     * @returns {ICalleeData|null}
     */
    public abstract extract (blockScopeBody: ESTree.Node[], callee: ESTree.Node): ICalleeData|null;
}
