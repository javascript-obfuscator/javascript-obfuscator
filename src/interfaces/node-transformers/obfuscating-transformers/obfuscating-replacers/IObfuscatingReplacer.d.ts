import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../../../types/node/TNodeWithLexicalScope';

export interface IObfuscatingReplacer <T = ESTree.Node> {
    /**
     * @param {Node} node
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {number} nodeIdentifier
     * @returns {T}
     */
    replace (
        node: ESTree.Node,
        lexicalScopeNode?: TNodeWithLexicalScope,
        nodeIdentifier?: number
    ): T;
}
