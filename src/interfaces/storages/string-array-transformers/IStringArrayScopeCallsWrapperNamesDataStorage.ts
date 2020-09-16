import { TNodeWithLexicalScopeStatements } from '../../../types/node/TNodeWithLexicalScopeStatements';
import { TStringArrayScopeCallsWrapperNamesDataByEncoding } from '../../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrapperNamesDataByEncoding';

import { IMapStorage } from '../IMapStorage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStringArrayScopeCallsWrapperNamesDataStorage extends IMapStorage<
    TNodeWithLexicalScopeStatements,
    TStringArrayScopeCallsWrapperNamesDataByEncoding
> {}
