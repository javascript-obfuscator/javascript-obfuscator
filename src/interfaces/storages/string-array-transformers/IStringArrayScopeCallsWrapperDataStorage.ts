import { TNodeWithLexicalScopeStatements } from '../../../types/node/TNodeWithLexicalScopeStatements';

import { IStringArrayScopeCallsWrapperData } from '../../node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';

import { IMapStorage } from '../IMapStorage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStringArrayScopeCallsWrapperDataStorage extends IMapStorage<
    TNodeWithLexicalScopeStatements,
    IStringArrayScopeCallsWrapperData
> {}
