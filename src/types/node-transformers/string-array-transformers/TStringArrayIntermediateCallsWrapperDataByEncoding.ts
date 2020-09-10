import { TStringArrayEncoding } from '../../options/TStringArrayEncoding';

import { IStringArrayIntermediateCallsWrapperData } from '../../../interfaces/node-transformers/string-array-transformers/IStringArrayIntermediateCallsWrapperData';

export type TStringArrayIntermediateCallsWrapperDataByEncoding = Partial<{
    [key in TStringArrayEncoding]: IStringArrayIntermediateCallsWrapperData;
}>;
