import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../../../types/node/TNodeWithLexicalScope';

import { IObfuscatingReplacer } from './IObfuscatingReplacer';

export interface IIdentifierObfuscatingReplacer extends IObfuscatingReplacer <ESTree.Identifier> {
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
     * @param {Identifier} identifierNode
     */
    preserveName (identifierNode: ESTree.Identifier): void;

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    preserveNameForLexicalScope (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void;
}
