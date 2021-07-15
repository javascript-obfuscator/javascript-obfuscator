import { TStringArrayEncoding } from '../../options/TStringArrayEncoding';

import { IStringArrayScopeCallsWrappersData } from '../../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrappersData';

export type TStringArrayScopeCallsWrappersDataByEncoding = Partial<{
    [key in TStringArrayEncoding]: IStringArrayScopeCallsWrappersData;
}>;
