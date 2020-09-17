import { TStringArrayEncoding } from '../../options/TStringArrayEncoding';

import { IStringArrayScopeCallsWrapperNamesData } from '../../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperNamesData';

export type TStringArrayScopeCallsWrapperNamesDataByEncoding = Partial<{
    [key in TStringArrayEncoding]: IStringArrayScopeCallsWrapperNamesData;
}>;
