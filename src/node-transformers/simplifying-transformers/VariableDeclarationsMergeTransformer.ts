import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeStatementUtils } from '../../node/NodeStatementUtils';

/**
 * replaces:
 *     var foo = 1;
 *     var bar = 2;
 *
 * on:
 *     var foo = 1,
 *         bar = 2;
 */
@injectable()
export class VariableDeclarationsMergeTransformer extends AbstractNodeTransformer {
    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Simplifying:
                return {
                    leave: (
                        node: ESTree.Node,
                        parentNode: ESTree.Node | null
                    ): ESTree.Node | estraverse.VisitorOption | undefined => {
                        if (parentNode && NodeGuards.isVariableDeclarationNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {ESTree.VariableDeclaration} variableDeclarationNode
     * @param {ESTree.Node} parentNode
     * @returns {ESTree.VariableDeclaration | estraverse.VisitorOption}
     */
    public transformNode (
        variableDeclarationNode: ESTree.VariableDeclaration,
        parentNode: ESTree.Node
    ): ESTree.VariableDeclaration | estraverse.VisitorOption {
        if (!NodeGuards.isNodeWithStatements(parentNode)) {
            return variableDeclarationNode;
        }

        const prevStatement: TStatement | null = NodeStatementUtils.getPreviousSiblingStatement(variableDeclarationNode);

        if (!prevStatement || !NodeGuards.isVariableDeclarationNode(prevStatement)) {
            return variableDeclarationNode;
        }

        if (variableDeclarationNode.kind !== prevStatement.kind) {
            return variableDeclarationNode;
        }

        prevStatement.declarations.push(...variableDeclarationNode.declarations);

        return estraverse.VisitorOption.Remove;
    }
}
