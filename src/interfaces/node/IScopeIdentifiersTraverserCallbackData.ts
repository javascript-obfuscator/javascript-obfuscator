import * as eslintScope from 'eslint-scope';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

export interface IScopeIdentifiersTraverserCallbackData {
    isGlobalDeclaration: boolean;
    isBubblingDeclaration: boolean;
    rootScope: eslintScope.Scope;
    variable: eslintScope.Variable;
    variableLexicalScopeNode: TNodeWithLexicalScope;
    variableScope: eslintScope.Scope;
}
