import * as ESTree from 'estree';

import { TNodeWithBlockScope } from '../../../../types/node/TNodeWithBlockScope';

export interface IObfuscatingReplacer <T = ESTree.Node> {
    /**
     * @param {SimpleLiteral["value"]} nodeValue
     * @param {TNodeWithBlockScope} blockScopeNode
     * @param {number} nodeIdentifier
     * @returns {T}
     */
    replace (nodeValue: ESTree.SimpleLiteral['value'], blockScopeNode?: TNodeWithBlockScope, nodeIdentifier?: number): T;
}
