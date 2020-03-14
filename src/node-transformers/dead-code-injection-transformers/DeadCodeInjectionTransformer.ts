import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TDeadNodeInjectionCustomNodeFactory } from '../../types/container/custom-nodes/TDeadNodeInjectionCustomNodeFactory';
import { TInitialData } from '../../types/TInitialData';
import { TNodeWithStatements } from '../../types/node/TNodeWithStatements';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { INodeTransformersRunner } from '../../interfaces/node-transformers/INodeTransformersRunner';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { DeadCodeInjectionCustomNode } from '../../enums/custom-nodes/DeadCodeInjectionCustomNode';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeType } from '../../enums/node/NodeType';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { BlockStatementDeadCodeInjectionNode } from '../../custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeStatementUtils } from '../../node/NodeStatementUtils';
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
        NodeTransformer.LabeledStatementTransformer,
        NodeTransformer.ScopeIdentifiersTransformer
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
     * @type {INodeTransformersRunner}
     */
    private readonly transformersRunner: INodeTransformersRunner;

    /**
     * @param {TDeadNodeInjectionCustomNodeFactory} deadCodeInjectionCustomNodeFactory
     * @param {INodeTransformersRunner} transformersRunner
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IDeadCodeInjectionCustomNode)
            deadCodeInjectionCustomNodeFactory: TDeadNodeInjectionCustomNodeFactory,
        @inject(ServiceIdentifiers.INodeTransformersRunner) transformersRunner: INodeTransformersRunner,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.deadCodeInjectionCustomNodeFactory = deadCodeInjectionCustomNodeFactory;
        this.transformersRunner = transformersRunner;
    }

    /**
     * @param {Node} targetNode
     * @returns {boolean}
     */
    private static isProhibitedNodeInsideCollectedBlockStatement (targetNode: ESTree.Node): boolean {
        return NodeGuards.isBreakStatementNode(targetNode)
            || NodeGuards.isContinueStatementNode(targetNode)
            || NodeGuards.isAwaitExpressionNode(targetNode)
            || NodeGuards.isSuperNode(targetNode);
    }

    /**
     * @param {Node} targetNode
     * @returns {boolean}
     */
    private static isScopeHoistingFunctionDeclaration (targetNode: ESTree.Node): boolean {
        if (!NodeGuards.isFunctionDeclarationNode(targetNode)) {
            return false;
        }

        const scopeNode: TNodeWithStatements = NodeStatementUtils.getScopeOfNode(targetNode);
        const scopeBody: ESTree.Statement[] = !NodeGuards.isSwitchCaseNode(scopeNode)
            ? <ESTree.Statement[]>scopeNode.body
            : scopeNode.consequent;
        const indexInScope: number = scopeBody.indexOf(targetNode);

        if (indexInScope === 0) {
            return false;
        }

        const slicedBody: ESTree.Statement[] = scopeBody.slice(0, indexInScope);
        const hostBlockStatementNode: ESTree.BlockStatement = NodeFactory.blockStatementNode(slicedBody);
        const functionDeclarationName: string = targetNode.id.name;

        let isScopeHoistedFunctionDeclaration: boolean = false;

        estraverse.traverse(hostBlockStatementNode, {
            enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                if (NodeGuards.isIdentifierNode(node) && node.name === functionDeclarationName) {
                    isScopeHoistedFunctionDeclaration = true;

                    return estraverse.VisitorOption.Break;
                }
            }
        });

        return isScopeHoistedFunctionDeclaration;
    }

    /**
     * @param {BlockStatement} blockStatementNode
     * @returns {boolean}
     */
    private static isValidCollectedBlockStatementNode (blockStatementNode: ESTree.BlockStatement): boolean {
        if (!blockStatementNode.body.length) {
            return false;
        }

        let nestedBlockStatementsCount: number = 0;
        let isValidBlockStatementNode: boolean = true;

        estraverse.traverse(blockStatementNode, {
            enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                if (NodeGuards.isBlockStatementNode(node)) {
                    nestedBlockStatementsCount++;
                }

                if (
                    nestedBlockStatementsCount > DeadCodeInjectionTransformer.maxNestedBlockStatementsCount
                    || DeadCodeInjectionTransformer.isProhibitedNodeInsideCollectedBlockStatement(node)
                    || DeadCodeInjectionTransformer.isScopeHoistingFunctionDeclaration(node)
                ) {
                    isValidBlockStatementNode = false;

                    return estraverse.VisitorOption.Break;
                }
            }
        });

        return isValidBlockStatementNode;
    }

    /**
     * @param {BlockStatement} blockStatementNode
     * @returns {boolean}
     */
    private static isValidWrappedBlockStatementNode (blockStatementNode: ESTree.BlockStatement): boolean {
        if (!blockStatementNode.body.length) {
            return false;
        }

        let isValidBlockStatementNode: boolean = true;

        estraverse.traverse(blockStatementNode, {
            enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                if (DeadCodeInjectionTransformer.isScopeHoistingFunctionDeclaration(node)) {
                    isValidBlockStatementNode = false;

                    return estraverse.VisitorOption.Break;
                }
            }
        });

        if (!isValidBlockStatementNode) {
            return false;
        }

        const parentNodeWithStatements: TNodeWithStatements = NodeStatementUtils
            .getParentNodeWithStatements(blockStatementNode);

        return parentNodeWithStatements.type !== NodeType.Program;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.DeadCodeInjection:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isProgramNode(node)) {
                            this.analyzeNode(node, parentNode);

                            return node;
                        }
                    },
                    leave: (
                        node: ESTree.Node,
                        parentNode: ESTree.Node | null
                    ): ESTree.Node | estraverse.VisitorOption | undefined => {
                        if (parentNode && NodeGuards.isBlockStatementNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            case NodeTransformationStage.Finalizing:
                if (!this.deadCodeInjectionRootAstHostNodeSet.size) {
                    return null;
                }

                return {
                    enter: (
                        node: ESTree.Node,
                        parentNode: ESTree.Node | null
                    ): ESTree.Node | estraverse.VisitorOption |undefined => {
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

                const clonedBlockStatementNode: ESTree.BlockStatement = NodeUtils.clone(node);

                if (!DeadCodeInjectionTransformer.isValidCollectedBlockStatementNode(clonedBlockStatementNode)) {
                    return;
                }

                /**
                 * We should transform identifiers in the dead code block statement to avoid conflicts with original code
                 */
                const transformedBlockStatementNode: ESTree.BlockStatement =
                    this.makeClonedBlockStatementNodeUnique(clonedBlockStatementNode);

                this.collectedBlockStatements.push(transformedBlockStatementNode);
            }
        });

        this.collectedBlockStatementsTotalLength = this.collectedBlockStatements.length;
    }

    /**
     * @param {BlockStatement} blockStatementNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards | VisitorOption}
     */
    public transformNode (
        blockStatementNode: ESTree.BlockStatement,
        parentNode: ESTree.Node
    ): ESTree.Node | estraverse.VisitorOption {
        const canBreakTraverse: boolean = !this.collectedBlockStatements.length
            || this.collectedBlockStatementsTotalLength < DeadCodeInjectionTransformer.minCollectedBlockStatementsCount;

        if (canBreakTraverse) {
            return estraverse.VisitorOption.Break;
        }

        if (
            this.randomGenerator.getMathRandom() > this.options.deadCodeInjectionThreshold
            || !DeadCodeInjectionTransformer.isValidWrappedBlockStatementNode(blockStatementNode)
        ) {
            return blockStatementNode;
        }

        const minInteger: number = 0;
        const maxInteger: number = this.collectedBlockStatements.length - 1;
        const randomIndex: number = this.randomGenerator.getRandomInteger(minInteger, maxInteger);
        const randomBlockStatementNode: ESTree.BlockStatement = this.collectedBlockStatements.splice(randomIndex, 1)[0];
        const isDuplicateBlockStatementNodes: boolean = randomBlockStatementNode === blockStatementNode;

        if (isDuplicateBlockStatementNodes) {
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
     * Make all identifiers in cloned block statement unique
     *
     * @param {BlockStatement} clonedBlockStatementNode
     * @returns {BlockStatement}
     */
    private makeClonedBlockStatementNodeUnique (clonedBlockStatementNode: ESTree.BlockStatement): ESTree.BlockStatement {
        // should wrap cloned block statement node into function node for correct scope encapsulation
        const hostNode: ESTree.Program = NodeFactory.programNode([
            NodeFactory.expressionStatementNode(
                NodeFactory.functionExpressionNode([], clonedBlockStatementNode)
            )
        ]);

        NodeUtils.parentizeAst(hostNode);
        NodeUtils.parentizeNode(hostNode, hostNode);

        this.transformersRunner.transform(
            hostNode,
            DeadCodeInjectionTransformer.transformersToRenameBlockScopeIdentifiers,
            NodeTransformationStage.Obfuscating
        );

        return clonedBlockStatementNode;
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
        const deadCodeInjectionRootAstHostNode: ESTree.BlockStatement = NodeFactory.blockStatementNode([
            NodeFactory.functionDeclarationNode(
                DeadCodeInjectionTransformer.deadCodeInjectionRootAstHostNodeName,
                [],
                randomBlockStatementNode
            )
        ]);

        /**
         * Should store that host node and then extract random block statement node on the `finalizing` stage
         */
        this.deadCodeInjectionRootAstHostNodeSet.add(deadCodeInjectionRootAstHostNode);

        const blockStatementDeadCodeInjectionCustomNode: ICustomNode<TInitialData<BlockStatementDeadCodeInjectionNode>> =
            this.deadCodeInjectionCustomNodeFactory(DeadCodeInjectionCustomNode.BlockStatementDeadCodeInjectionNode);

        blockStatementDeadCodeInjectionCustomNode.initialize(blockStatementNode, deadCodeInjectionRootAstHostNode);

        const newBlockStatementNode: ESTree.BlockStatement = <ESTree.BlockStatement>blockStatementDeadCodeInjectionCustomNode.getNode()[0];

        NodeUtils.parentizeNode(newBlockStatementNode, parentNode);

        return newBlockStatementNode;
    }
}
