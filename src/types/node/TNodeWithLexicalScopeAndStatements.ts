import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from './TNodeWithLexicalScope';

export type TNodeWithLexicalScopeAndStatements = TNodeWithLexicalScope
    & {
        body: ESTree.Program | ESTree.BlockStatement;
    };
