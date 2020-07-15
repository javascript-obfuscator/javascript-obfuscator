import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStatementSimplifyData } from '../../interfaces/node-transformers/simplifying-transformers/IStatementSimplifyData';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractStatementSimplifyTransformer } from './AbstractStatementSimplifyTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';

/**
 * Simplifies `BlockStatement` node
 */
@injectable()
export class BlockStatementSimplifyTransformer extends AbstractStatementSimplifyTransformer {
    /**
     * @type {NodeTransformer[]}
     */
    public readonly runAfter: NodeTransformer[] = [
        NodeTransformer.VariableDeclarationsMergeTransformer
    ];

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
                    ): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isBlockStatementNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {ESTree.Statement} statementNode
     * @param {ESTree.Node} parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (
        statementNode: ESTree.Statement,
        parentNode: ESTree.Node
    ): ESTree.Node {
        const simplifyData: IStatementSimplifyData | null = this.getStatementSimplifyData(statementNode);

        if (!simplifyData) {
            return statementNode;
        }

        const partialStatementNode: ESTree.Statement = this.getPartialStatement(simplifyData);
        const transformedNode: ESTree.Node = NodeGuards.isBlockStatementNode(partialStatementNode)
            ? partialStatementNode
            : NodeFactory.blockStatementNode([partialStatementNode]);

        return NodeUtils.parentizeNode(transformedNode, parentNode);
    }
}
