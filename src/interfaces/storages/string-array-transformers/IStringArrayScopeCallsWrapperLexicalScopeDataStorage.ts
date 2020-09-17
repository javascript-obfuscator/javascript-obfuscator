import { TNodeWithLexicalScopeStatements } from '../../../types/node/TNodeWithLexicalScopeStatements';

import { IMapStorage } from '../IMapStorage';
import { IStringArrayScopeCallsWrapperLexicalScopeData } from '../../node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperLexicalScopeData';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStringArrayScopeCallsWrapperLexicalScopeDataStorage extends IMapStorage<
    TNodeWithLexicalScopeStatements,
    IStringArrayScopeCallsWrapperLexicalScopeData
> {}
