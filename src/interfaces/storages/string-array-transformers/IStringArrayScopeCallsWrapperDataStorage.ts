import { TNodeWithLexicalScope } from '../../../types/node/TNodeWithLexicalScope';
import { TStringArrayScopeCallsWrapperDataByEncoding } from '../../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrapperDataByEncoding';

import { IMapStorage } from '../IMapStorage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStringArrayScopeCallsWrapperDataStorage extends IMapStorage<
    TNodeWithLexicalScope,
    TStringArrayScopeCallsWrapperDataByEncoding
> {}
