import * as ESTree from 'estree';

export interface INodeControlFlowChanger {
    /**
     * @param node
     * @param parentNode
     */
    changeControlFlow (node: ESTree.Node, parentNode?: ESTree.Node): void;
}
