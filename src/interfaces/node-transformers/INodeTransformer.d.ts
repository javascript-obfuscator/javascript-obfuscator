import * as ESTree from 'estree';

import { IVisitor } from '../IVisitor';

export interface INodeTransformer {
    /**
     * @returns {IVisitor}
     */
    getVisitor (): IVisitor;

    /**
     * @param node
     * @param parentNode
     * @returns {ESTree.Node}
     */
    transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node;
}
