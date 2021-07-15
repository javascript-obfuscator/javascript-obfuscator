import { TStringArrayEncoding } from '../../../types/options/TStringArrayEncoding';

import { IStringArrayScopeCallsWrapperData } from './IStringArrayScopeCallsWrapperData';

export interface IStringArrayScopeCallsWrappersData {
    /**
     * @type {TStringArrayEncoding}
     */
    encoding: TStringArrayEncoding;

    /**
     * @type {string[]}
     */
    scopeCallsWrappersData: IStringArrayScopeCallsWrapperData[];
}
