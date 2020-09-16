import { TNodeWithLexicalScopeStatements } from '../../../types/node/TNodeWithLexicalScopeStatements';
import { TStringArrayScopeCallsWrapperNamesDataByEncoding } from '../../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrapperNamesDataByEncoding';

export interface IStringArrayScopeCallsWrapperData {
    /**
     * @type {number}
     */
    globalIndexShift: number;

    /**
     * @type {TStringArrayScopeCallsWrapperNamesDataByEncoding}
     */
    names: TStringArrayScopeCallsWrapperNamesDataByEncoding;

    /**
     * @type {TNodeWithLexicalScopeStatements | null}
     */
    parentLexicalScopeNode: TNodeWithLexicalScopeStatements | null;

    /**
     * @type {number}
     */
    scopeIndexShift: number;
}
