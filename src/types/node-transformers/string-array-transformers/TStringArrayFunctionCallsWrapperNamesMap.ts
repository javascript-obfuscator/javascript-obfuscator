import { TStringArrayEncoding } from '../../options/TStringArrayEncoding';

import { IStringArrayFunctionCallsWrapperName } from '../../../interfaces/node-transformers/string-array-transformers/IStringArrayFunctionCallsWrapperName';

export type TStringArrayFunctionCallsWrapperNamesMap = Partial<{
    [key in TStringArrayEncoding]: IStringArrayFunctionCallsWrapperName;
}>;
