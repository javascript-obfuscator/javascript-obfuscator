export interface IObfuscationReplacer {
    /**
     * @param nodeValue
     * @param nodeIdentifier
     */
    replace (nodeValue: any, nodeIdentifier?: number): string;
}
