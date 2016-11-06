import * as ESTree from 'estree';

import { ICalleeDataExtractor } from '../interfaces/stack-trace-analyzer/ICalleeDataExtractor';

export type TCalleeDataExtractor = (new (blockScopeBody: ESTree.Node[], callee: any) => ICalleeDataExtractor);
