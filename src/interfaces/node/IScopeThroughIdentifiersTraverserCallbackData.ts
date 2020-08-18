import * as eslintScope from 'eslint-scope';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

export interface IScopeThroughIdentifiersTraverserCallbackData {
    reference: eslintScope.Reference;
    variableLexicalScopeNode: TNodeWithLexicalScope;
}
