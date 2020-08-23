import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../../../types/node/TNodeWithLexicalScope';

export interface IIdentifierReplacer {
    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    storeGlobalName (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void;

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    storeLocalName (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void;

    /**
     * @param {Node} node
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {number} nodeIdentifier
     * @returns {ESTree.Identifier}
     */
    replace (
        node: ESTree.Node,
        lexicalScopeNode?: TNodeWithLexicalScope,
        nodeIdentifier?: number
    ): ESTree.Identifier;

    /**
     * @param {Identifier} identifierNode
     */
    preserveName (identifierNode: ESTree.Identifier): void;

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    preserveNameForLexicalScope (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void;
}
