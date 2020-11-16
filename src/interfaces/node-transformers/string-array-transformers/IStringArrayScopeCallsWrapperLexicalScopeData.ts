import { TNodeWithLexicalScopeStatements } from '../../../types/node/TNodeWithLexicalScopeStatements';

import { IStringArrayScopeCallsWrapperParameterIndexesData } from './IStringArrayScopeCallsWrapperParameterIndexesData';

export interface IStringArrayScopeCallsWrapperLexicalScopeData {
    /**
     * @type {TNodeWithLexicalScopeStatements | null}
     */
    parentLexicalScopeBodyNode: TNodeWithLexicalScopeStatements | null;

    /**
     * @type {number}
     */
    resultShiftedIndex: number;

    /**
     * @type {number}
     */
    scopeShiftedIndex: number;

    /**
     * @type {IStringArrayScopeCallsWrapperParameterIndexesData | null}
     */
    callsWrappersParameterIndexesData: IStringArrayScopeCallsWrapperParameterIndexesData | null;
}
