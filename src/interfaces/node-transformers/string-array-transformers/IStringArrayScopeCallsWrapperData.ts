import { IStringArrayScopeCallsWrapperParameterIndexesData } from './IStringArrayScopeCallsWrapperParameterIndexesData';

export interface IStringArrayScopeCallsWrapperData {
    /**
     * @type {number}
     */
    index: number;

    /**
     * @type {string}
     */
    name: string;

    /**
     * @type {IStringArrayScopeCallsWrapperParameterIndexesData | null}
     */
    parameterIndexesData: IStringArrayScopeCallsWrapperParameterIndexesData | null;
}
