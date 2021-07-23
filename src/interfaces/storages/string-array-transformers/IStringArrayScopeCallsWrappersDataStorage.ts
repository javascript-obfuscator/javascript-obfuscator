import { TNodeWithLexicalScopeStatements } from '../../../types/node/TNodeWithLexicalScopeStatements';
import { TStringArrayScopeCallsWrappersDataByEncoding } from '../../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrappersDataByEncoding';

import { IMapStorage } from '../IMapStorage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStringArrayScopeCallsWrappersDataStorage extends IMapStorage<
    TNodeWithLexicalScopeStatements,
    TStringArrayScopeCallsWrappersDataByEncoding
> {}
