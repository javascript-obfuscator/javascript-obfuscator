import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

export interface INodeTransformer {
    /**
     * @returns {estraverse.Visitor}
     */
    getVisitor (): estraverse.Visitor;

    /**
     * @param node
     * @param parentNode
     * @returns {ESTree.Node}
     */
    transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node;
}
