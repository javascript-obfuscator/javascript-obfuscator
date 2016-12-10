import * as ESTree from 'estree';

export interface INodeTransformer {
    /**
     * @param node
     * @param parentNode
     */
    transformNode (node: ESTree.Node, parentNode?: ESTree.Node): void;
}
