import * as ESTree from 'estree';

export interface IObfuscatingReplacer <T = ESTree.Node> {
    /**
     * @param nodeValue
     * @param nodeIdentifier
     */
    replace (nodeValue: any, nodeIdentifier?: number): T;
}
