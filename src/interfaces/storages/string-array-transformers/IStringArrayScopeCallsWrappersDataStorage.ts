import { TNodeWithLexicalScopeStatements } from '../../../types/node/TNodeWithLexicalScopeStatements';
import { TStringArrayScopeCallsWrappersDataByEncoding } from '../../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrappersDataByEncoding';

import { IWeakMapStorage } from '../IWeakMapStorage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStringArrayScopeCallsWrappersDataStorage extends IWeakMapStorage<
    TNodeWithLexicalScopeStatements,
    TStringArrayScopeCallsWrappersDataByEncoding
> {}
