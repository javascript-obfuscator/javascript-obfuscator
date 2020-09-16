import { TNodeWithLexicalScopeStatements } from '../../../types/node/TNodeWithLexicalScopeStatements';

import { IArrayStorage } from '../IArrayStorage';

export interface IVisitedLexicalScopeNodesStackStorage extends IArrayStorage<TNodeWithLexicalScopeStatements> {
    /**
     * @returns {TNodeWithLexicalScopeStatements | undefined}
     */
    getLastElement (): TNodeWithLexicalScopeStatements | undefined;

    /**
     * @returns {TNodeWithLexicalScopeStatements | undefined}
     */
    getPenultimateElement (): TNodeWithLexicalScopeStatements | undefined;

    /**
     * @returns {TNodeWithLexicalScopeStatements | undefined}
     */
    pop (): TNodeWithLexicalScopeStatements | undefined;

    /**
     * @param {TNodeWithLexicalScopeStatements} lexicalScopeBodyNode
     */
    push (lexicalScopeBodyNode: TNodeWithLexicalScopeStatements): void;
}
