import { TStringArrayEncoding } from '../../options/TStringArrayEncoding';

import { IStringArrayScopeCallsWrapperData } from '../../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';

export type TStringArrayScopeCallsWrapperDataByEncoding = Partial<{
    [key in TStringArrayEncoding]: IStringArrayScopeCallsWrapperData;
}>;
