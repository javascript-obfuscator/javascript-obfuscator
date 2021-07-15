import { TNodeWithLexicalScopeStatements } from '../../../types/node/TNodeWithLexicalScopeStatements';

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
}
