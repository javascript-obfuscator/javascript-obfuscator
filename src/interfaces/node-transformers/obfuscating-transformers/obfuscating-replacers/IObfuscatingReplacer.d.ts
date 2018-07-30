import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../../../types/node/TNodeWithLexicalScope';

export interface IObfuscatingReplacer <T = ESTree.Node> {
    /**
     * @param {SimpleLiteral["value"]} nodeValue
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {number} nodeIdentifier
     * @returns {T}
     */
    replace (nodeValue: ESTree.SimpleLiteral['value'], lexicalScopeNode?: TNodeWithLexicalScope, nodeIdentifier?: number): T;
}
