import * as ESTree from 'estree';

export interface INodeTransformer {
    /**
     * @param node
     * @param parentNode
     * @returns {ESTree.Node}
     */
    transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node;
}
