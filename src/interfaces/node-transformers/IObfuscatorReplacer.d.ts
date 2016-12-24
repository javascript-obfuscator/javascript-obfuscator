import * as ESTree from 'estree';

export interface IObfuscatorReplacer {
    /**
     * @param nodeValue
     * @param nodeIdentifier
     */
    replace (nodeValue: any, nodeIdentifier?: number): string;
}
