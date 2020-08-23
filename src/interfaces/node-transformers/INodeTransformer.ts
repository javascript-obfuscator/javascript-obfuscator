import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ITransformer } from '../ITransformer';
import { IVisitor } from './IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

export interface INodeTransformer extends ITransformer <NodeTransformer> {
    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null;

    /**
     * @param {Node} node
     * @param {Node | null} parentNode
     */
    prepareNode ? (node: ESTree.Node, parentNode: ESTree.Node | null): void;

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
