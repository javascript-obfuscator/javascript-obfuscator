import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IVisitor } from './IVisitor';

export interface INodeTransformer {
    /**
     * @returns {IVisitor}
     */
    getVisitor (): IVisitor;

    /**
     * @param {Node} node
     * @param {Node | null} parentNode
     */
    analyzeNode ? (node: ESTree.Node, parentNode: ESTree.Node | null): void;

    /**
     * @param {Node} node
     * @param {Node | null} parentNode
     * @returns {Node | VisitorOption}
     */
    transformNode (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | estraverse.VisitorOption;
}
