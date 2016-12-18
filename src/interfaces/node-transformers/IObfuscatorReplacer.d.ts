export interface IObfuscatorReplacer {
    /**
     * @param nodeValue
     * @param nodeIdentifier
     */
    replace (nodeValue: any, nodeIdentifier?: string): string;
}
