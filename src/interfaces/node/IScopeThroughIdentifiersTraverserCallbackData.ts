import * as eslintScope from 'eslint-scope';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

export interface IScopeThroughIdentifiersTraverserCallbackData {
    isGlobalDeclaration: boolean;
    reference: eslintScope.Reference;
    variableLexicalScopeNode: TNodeWithLexicalScope;
}
