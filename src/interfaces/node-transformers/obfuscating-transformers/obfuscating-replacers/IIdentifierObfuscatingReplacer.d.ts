import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../../../types/node/TNodeWithLexicalScope';

import { IObfuscatingReplacer } from './IObfuscatingReplacer';

export interface IIdentifierObfuscatingReplacer extends IObfuscatingReplacer <ESTree.Identifier> {
    /**
     * @param {string} nodeValue
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    storeGlobalName (nodeValue: string, lexicalScopeNode: TNodeWithLexicalScope): void;

    /**
     * @param {string} nodeValue
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    storeLocalName (nodeValue: string, lexicalScopeNode: TNodeWithLexicalScope): void;
}
