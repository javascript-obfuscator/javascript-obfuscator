import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TDeadNodeInjectionCustomNodeFactory } from '../../types/container/custom-nodes/TDeadNodeInjectionCustomNodeFactory';
import { TNodeWithBlockScope } from '../../types/node/TNodeWithBlockScope';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ITransformersRunner } from '../../interfaces/node-transformers/ITransformersRunner';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { DeadCodeInjectionCustomNode } from '../../enums/custom-nodes/DeadCodeInjectionCustomNode';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeType } from '../../enums/node/NodeType';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class DeadCodeInjectionTransformer extends AbstractNodeTransformer {
    /**
     * @type {string}
     */
    private static readonly deadCodeInjectionRootAstHostNodeName: string = 'deadCodeInjectionRootAstHostNode';

    /**
     * @type {number}
     */
    private static readonly maxNestedBlockStatementsCount: number = 4;

    /**
     * @type {number}
     */
    private static readonly minCollectedBlockStatementsCount: number = 5;

    /**
     * @type {NodeTransformer[]}
     */
    private static readonly transformersToRenameBlockScopeIdentifiers: NodeTransformer[] = [
        NodeTransformer.CatchClauseTransformer,
        NodeTransformer.ClassDeclarationTransformer,
        NodeTransformer.FunctionDeclarationTransformer,
        NodeTransformer.FunctionTransformer,
        NodeTransformer.LabeledStatementTransformer,
        NodeTransformer.VariableDeclarationTransformer
    ];

    /**
     * @type {Set <BlockStatement>}
     */
    private readonly deadCodeInjectionRootAstHostNodeSet: Set <ESTree.BlockStatement> = new Set();

    /**
     * @type {ESTree.BlockStatement[]}
     */
    private readonly collectedBlockStatements: ESTree.BlockStatement[] = [];

    /**
     * @type {number}
     */
    private collectedBlockStatementsTotalLength: number = 0;

    /**
     * @type {TDeadNodeInjectionCustomNodeFactory}
     */
    private readonly deadCodeInjectionCustomNodeFactory: TDeadNodeInjectionCustomNodeFactory;

    /**
     * @type {ITransformersRunner}
     */
    private readonly transformersRunner: ITransformersRunner;

    /**
     * @param {TControlFlowCustomNodeFactory} deadCodeInjectionCustomNodeFactory
     * @param {ITransformersRunner} transformersRunner
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IDeadCodeInjectionCustomNode)
            deadCodeInjectionCustomNodeFactory: TDeadNodeInjectionCustomNodeFactory,
        @inject(ServiceIdentifiers.ITransformersRunner) transformersRunner: ITransformersRunner,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.deadCodeInjectionCustomNodeFactory = deadCodeInjectionCustomNodeFactory;
        this.transformersRunner = transformersRunner;
    }

    /**
     * @param {Node} blockStatementNode
     * @returns {boolean}
     */
    private static isValidBlockStatementNode (blockStatementNode: ESTree.Node): boolean {
        const isProhibitedNode: (node: ESTree.Node) => boolean =
            (node: ESTree.Node): boolean => NodeGuards.isBreakStatementNode(node) ||
                NodeGuards.isContinueStatementNode(node) ||
                NodeGuards.isAwaitExpressionNode(node) ||
                NodeGuards.isSuperNode(node);

        let nestedBlockStatementsCount: number = 0;
        let isValidBlockStatementNode: boolean = true;

        estraverse.traverse(blockStatementNode, {
            enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                if (NodeGuards.isBlockStatementNode(node)) {
                    nestedBlockStatementsCount++;
                }

                if (
                    nestedBlockStatementsCount > DeadCodeInjectionTransformer.maxNestedBlockStatementsCount ||
                    isProhibitedNode(node)
                ) {
                    isValidBlockStatementNode = false;

                    return estraverse.VisitorOption.Break;
                }
            }
        });

        return isValidBlockStatementNode;
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.DeadCodeInjection:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (parentNode && NodeGuards.isProgramNode(node)) {
                            this.analyzeNode(node, parentNode);

                            return node;
                        }
                    },
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (parentNode && NodeGuards.isBlockStatementNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            case TransformationStage.Finalizing:
                if (!this.deadCodeInjectionRootAstHostNodeSet.size) {
                    return null;
                }

                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (parentNode && this.isDeadCodeInjectionRootAstHostNode(node)) {
                            return this.restoreNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {NodeGuards} programNode
     * @param {NodeGuards} parentNode
     */
    public analyzeNode (programNode: ESTree.Node, parentNode: ESTree.Node): void {
        estraverse.traverse(programNode, {
            enter: (node: ESTree.Node): void => {
                if (!NodeGuards.isBlockStatementNode(node)) {
                    return;
                }

                let clonedBlockStatementNode: ESTree.BlockStatement = NodeUtils.clone(node);

                if (!DeadCodeInjectionTransformer.isValidBlockStatementNode(clonedBlockStatementNode)) {
                    return;
                }

                /**
                 * We should transform identifiers in the dead code block statement to avoid conflicts with original code
                 */
                NodeUtils.parentizeNode(clonedBlockStatementNode, clonedBlockStatementNode);
                clonedBlockStatementNode = this.transformersRunner.transform(
                    clonedBlockStatementNode,
                    DeadCodeInjectionTransformer.transformersToRenameBlockScopeIdentifiers,
                    TransformationStage.Obfuscating
                );

                this.collectedBlockStatements.push(clonedBlockStatementNode);
            }
        });

        this.collectedBlockStatementsTotalLength = this.collectedBlockStatements.length;
    }

    /**
     * @param {BlockStatement} blockStatementNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards | VisitorOption}
     */
    public transformNode (blockStatementNode: ESTree.BlockStatement, parentNode: ESTree.Node): ESTree.Node | estraverse.VisitorOption {
        if (this.collectedBlockStatementsTotalLength < DeadCodeInjectionTransformer.minCollectedBlockStatementsCount) {
            return estraverse.VisitorOption.Break;
        }

        if (!this.collectedBlockStatements.length) {
            return estraverse.VisitorOption.Break;
        }

        if (this.randomGenerator.getMathRandom() > this.options.deadCodeInjectionThreshold) {
            return blockStatementNode;
        }

        const blockScopeOfBlockStatementNode: TNodeWithBlockScope = NodeUtils
            .getBlockScopesOfNode(blockStatementNode)[0];

        if (blockScopeOfBlockStatementNode.type === NodeType.Program) {
            return blockStatementNode;
        }

        const minInteger: number = 0;
        const maxInteger: number = this.collectedBlockStatements.length - 1;
        const randomIndex: number = this.randomGenerator.getRandomInteger(minInteger, maxInteger);
        const randomBlockStatementNode: ESTree.BlockStatement = this.collectedBlockStatements.splice(randomIndex, 1)[0];

        if (randomBlockStatementNode === blockStatementNode) {
            return blockStatementNode;
        }

        return this.replaceBlockStatementNode(blockStatementNode, randomBlockStatementNode, parentNode);
    }

    /**
     * @param {FunctionExpression} deadCodeInjectionRootAstHostNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public restoreNode (deadCodeInjectionRootAstHostNode: ESTree.BlockStatement, parentNode: ESTree.Node): ESTree.Node {
        const hostNodeFirstStatement: ESTree.Statement = deadCodeInjectionRootAstHostNode.body[0];

        if (!NodeGuards.isFunctionDeclarationNode(hostNodeFirstStatement)) {
            throw new Error('Wrong dead code injection root AST host node. Host node should contain `FunctionDeclaration` node');
        }

        return hostNodeFirstStatement.body;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    private isDeadCodeInjectionRootAstHostNode (node: ESTree.Node): node is ESTree.BlockStatement {
        return NodeGuards.isBlockStatementNode(node) && this.deadCodeInjectionRootAstHostNodeSet.has(node);
    }

    /**
     * @param {BlockStatement} blockStatementNode
     * @param {BlockStatement} randomBlockStatementNode
     * @param {Node} parentNode
     * @returns {BlockStatement}
     */
    private replaceBlockStatementNode (
        blockStatementNode: ESTree.BlockStatement,
        randomBlockStatementNode: ESTree.BlockStatement,
        parentNode: ESTree.Node
    ): ESTree.BlockStatement {
        /**
         * Should wrap original random block statement node into the parent block statement node (ast root host node)
         * with function declaration node. This function declaration node will create block scope for all identifiers
         * inside random block statement node and this identifiers won't affect identifiers of the rest AST tree.
         */
        const deadCodeInjectionRootAstHostNode: ESTree.BlockStatement = Nodes.getBlockStatementNode([
            Nodes.getFunctionDeclarationNode(
                DeadCodeInjectionTransformer.deadCodeInjectionRootAstHostNodeName,
                [],
                randomBlockStatementNode
            )
        ]);

        /**
         * Should store that host node and then extract random block statement node on the `finalizing` stage
         */
        this.deadCodeInjectionRootAstHostNodeSet.add(deadCodeInjectionRootAstHostNode);

        const blockStatementDeadCodeInjectionCustomNode: ICustomNode = this.deadCodeInjectionCustomNodeFactory(
            DeadCodeInjectionCustomNode.BlockStatementDeadCodeInjectionNode
        );

        blockStatementDeadCodeInjectionCustomNode.initialize(blockStatementNode, deadCodeInjectionRootAstHostNode);

        const newBlockStatementNode: ESTree.BlockStatement = <ESTree.BlockStatement>blockStatementDeadCodeInjectionCustomNode.getNode()[0];

        NodeUtils.parentizeNode(newBlockStatementNode, parentNode);

        return newBlockStatementNode;
    }
}
