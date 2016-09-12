import * as ESTree from 'estree';

export interface INodeObfuscator {
    /**
     * @param node
     * @param parentNode
     */
    obfuscateNode (node: ESTree.Node, parentNode?: ESTree.Node): void;
}
