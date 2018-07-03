import * as ESTree from 'estree';

import { TNodeWithBlockScope } from '../../../../types/node/TNodeWithBlockScope';

export interface IObfuscatingReplacer <T = ESTree.Node> {
    /**
     * @param {Node} node
     * @param {TNodeWithBlockScope} blockScopeNode
     * @param {number} nodeIdentifier
     * @returns {T}
     */
    replace (node: ESTree.Node, blockScopeNode?: TNodeWithBlockScope, nodeIdentifier?: number): T;
}
