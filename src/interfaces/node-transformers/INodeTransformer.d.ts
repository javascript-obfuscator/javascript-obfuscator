import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IVisitor } from './IVisitor';

import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

export interface INodeTransformer {
    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    getVisitor (transformationStage: TransformationStage): IVisitor | null;

    /**
     * @param {Node} node
     * @param {Node | null} parentNode
     */
    analyzeNode ? (node: ESTree.Node, parentNode: ESTree.Node | null): void;

    /**
     * @param {Node} node
     * @param {Node | null} parentNode
     */
    restoreNode ? (node: ESTree.Node, parentNode: ESTree.Node | null): void;

    /**
     * @param {Node} node
     * @param {Node | null} parentNode
     * @returns {Node | VisitorOption}
     */
    transformNode (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | estraverse.VisitorOption;
}
