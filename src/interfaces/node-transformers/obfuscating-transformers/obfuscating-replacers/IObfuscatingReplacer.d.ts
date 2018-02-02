import * as ESTree from 'estree';

export interface IObfuscatingReplacer <T = ESTree.Node> {
    /**
     * @param {SimpleLiteral['value']} nodeValue
     * @param {number} nodeIdentifier
     * @returns {T}
     */
    replace (nodeValue: ESTree.SimpleLiteral['value'], nodeIdentifier?: number): T;
}
