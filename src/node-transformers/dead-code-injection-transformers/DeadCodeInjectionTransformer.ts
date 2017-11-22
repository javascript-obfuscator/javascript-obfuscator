import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ITransformersRunner } from '../../interfaces/node-transformers/ITransformersRunner';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeType } from '../../enums/node/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class DeadCodeInjectionTransformer extends AbstractNodeTransformer {
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
     * @type {ESTree.BlockStatement[]}
     */
    private readonly collectedBlockStatements: ESTree.BlockStatement[] = [];

    /**
     * @type {number}
     */
    private collectedBlockStatementsLength: number;

    /**
     * @type {ITransformersRunner}
     */
    private readonly transformersRunner: ITransformersRunner;

    /**
     * @param {ITransformersRunner} transformersRunner
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.ITransformersRunner) transformersRunner: ITransformersRunner,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.transformersRunner = transformersRunner;
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
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
    }

    /**
     * @param {NodeGuards} programNode
     * @param {NodeGuards} parentNode
     */
    public analyzeNode (programNode: ESTree.Node, parentNode: ESTree.Node): void {
        estraverse.traverse(programNode, {
            enter: (node: ESTree.Node): any => {
                if (NodeGuards.isBlockStatementNode(node)) {
                    this.collectBlockStatementNodes(node, this.collectedBlockStatements);
                }
            }
        });

        this.collectedBlockStatementsLength = this.collectedBlockStatements.length;
    }

    /**
     * @param {BlockStatement} blockStatementNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards | VisitorOption}
     */
    public transformNode (blockStatementNode: ESTree.BlockStatement, parentNode: ESTree.Node): ESTree.Node | estraverse.VisitorOption {
        if (this.collectedBlockStatementsLength < DeadCodeInjectionTransformer.minCollectedBlockStatementsCount) {
            return estraverse.VisitorOption.Break;
        }

        if (!this.collectedBlockStatements.length) {
            return estraverse.VisitorOption.Break;
        }

        if (this.randomGenerator.getMathRandom() > this.options.deadCodeInjectionThreshold) {
            return blockStatementNode;
        }

        const blockScopeOfBlockStatementNode: TNodeWithBlockStatement = NodeUtils
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

        return this.replaceBlockStatementNode(blockStatementNode, randomBlockStatementNode);
    }

    /**
     * @param {BlockStatement} blockStatementNode
     * @param {BlockStatement[]} collectedBlockStatements
     */
    private collectBlockStatementNodes (
        blockStatementNode: ESTree.BlockStatement,
        collectedBlockStatements: ESTree.BlockStatement[]
    ): void {
        let clonedBlockStatementNode: ESTree.BlockStatement = NodeUtils.clone(blockStatementNode),
            nestedBlockStatementsCount: number = 0,
            isValidBlockStatementNode: boolean = true;

        estraverse.replace(clonedBlockStatementNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): any => {
                /**
                 * Count nested block statements in current block statement
                 */
                if (NodeGuards.isBlockStatementNode(node)) {
                    nestedBlockStatementsCount++;
                }

                /**
                 * If nested block statements count bigger then specified amount or current block statement
                 * contains prohibited nodes - we will stop traversing and leave method
                 */
                if (
                    nestedBlockStatementsCount > DeadCodeInjectionTransformer.maxNestedBlockStatementsCount ||
                    NodeGuards.isBreakStatementNode(node) ||
                    NodeGuards.isContinueStatementNode(node) ||
                    NodeGuards.isAwaitExpressionNode(node)
                ) {
                    isValidBlockStatementNode = false;

                    return estraverse.VisitorOption.Break;
                }

                return node;
            }
        });

        if (!isValidBlockStatementNode) {
            return;
        }

        /**
         * We should transform identifiers in the dead code block statement to avoid conflicts with original code
         */
        clonedBlockStatementNode = this.transformersRunner.transform(
            clonedBlockStatementNode,
            DeadCodeInjectionTransformer.transformersToRenameBlockScopeIdentifiers
        );

        collectedBlockStatements.push(clonedBlockStatementNode);
    }

    /**
     * @param {BlockStatement} blockStatementNode
     * @param {BlockStatement} randomBlockStatementNode
     * @returns {BlockStatement}
     */
    private replaceBlockStatementNode (
        blockStatementNode: ESTree.BlockStatement,
        randomBlockStatementNode: ESTree.BlockStatement
    ): ESTree.BlockStatement {
        const random1: boolean = this.randomGenerator.getMathRandom() > 0.5;
        const random2: boolean = this.randomGenerator.getMathRandom() > 0.5;

        const operator: ESTree.BinaryOperator = random1 ? '===' : '!==';
        const leftString: string = this.randomGenerator.getRandomString(3);
        const rightString: string = random2 ? leftString : this.randomGenerator.getRandomString(3);

        const [consequent, alternate]: [ESTree.BlockStatement, ESTree.BlockStatement] = random1 === random2
            ? [blockStatementNode, randomBlockStatementNode]
            : [randomBlockStatementNode, blockStatementNode];

        let newBlockStatementNode: ESTree.BlockStatement = Nodes.getBlockStatementNode([
            Nodes.getIfStatementNode(
                Nodes.getBinaryExpressionNode(
                    operator,
                    Nodes.getLiteralNode(leftString),
                    Nodes.getLiteralNode(rightString)
                ),
                consequent,
                alternate
            )
        ]);

        newBlockStatementNode = NodeUtils.parentize(newBlockStatementNode);

        return newBlockStatementNode;
    }
}
