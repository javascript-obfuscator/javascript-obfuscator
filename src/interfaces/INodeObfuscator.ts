export interface INodeObfuscator {
    /**
     * @param node
     * @param parentNode
     */
    obfuscateNode (node: any, parentNode?: any): void;
}