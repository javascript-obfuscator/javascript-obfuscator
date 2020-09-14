import { TNodeWithLexicalScopeAndStatements } from '../../../types/node/TNodeWithLexicalScopeAndStatements';

import { IArrayStorage } from '../IArrayStorage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IVisitedLexicalScopeNodesStackStorage extends IArrayStorage<TNodeWithLexicalScopeAndStatements> {
    /**
     * @returns {TNodeWithLexicalScopeAndStatements | undefined}
     */
    getLastElement (): TNodeWithLexicalScopeAndStatements | undefined;

    /**
     * @returns {TNodeWithLexicalScopeAndStatements | undefined}
     */
    pop (): TNodeWithLexicalScopeAndStatements | undefined;

    /**
     * @param {TNodeWithLexicalScopeAndStatements} lexicalScopeNode
     */
    push (lexicalScopeNode: TNodeWithLexicalScopeAndStatements): void;
}
