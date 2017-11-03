import * as ESTree from 'estree';

export interface IObfuscatingReplacer <T = ESTree.Node> {
    /**
     * @param nodeValue
     * @param {number} nodeIdentifier
     * @returns {T}
     */
    replace (nodeValue: any, nodeIdentifier?: number): T;
}
