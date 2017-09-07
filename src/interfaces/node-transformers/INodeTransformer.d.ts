import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IVisitor } from '../IVisitor';

export interface INodeTransformer {
    /**
     * @returns {IVisitor}
     */
    getVisitor (): IVisitor;

    /**
     * @param {Node} node
     * @param {Node} parentNode
     */
    analyzeNode ? (node: ESTree.Node, parentNode: ESTree.Node): void;

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {Node | VisitorOption}
     */
    transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node | estraverse.VisitorOption;
}
