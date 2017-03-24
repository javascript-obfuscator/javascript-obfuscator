import * as ESTree from 'estree';

export interface IDeadCodeInjectionReplacer {
    /**
     * @param node
     * @param parentNode
     * @returns ESTree.Node
     */
    replace (
        node: ESTree.Node,
        parentNode: ESTree.Node
    ): ESTree.Node;
}
