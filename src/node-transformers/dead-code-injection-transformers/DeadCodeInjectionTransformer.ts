import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

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
     * @type {ESTree.BlockStatement[]}
     */
    private readonly collectedBlockStatements: ESTree.BlockStatement[] = [];

    /**
     * @type {number}
     */
    private collectedBlockStatementsLength: number;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (NodeGuards.isProgramNode(node)) {
                    this.analyzeNode(node, parentNode);

                    return node;
                }
            },
            leave: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (NodeGuards.isBlockStatementNode(node)) {
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
    public transformNode (
        blockStatementNode: ESTree.BlockStatement,
        parentNode: ESTree.Node
    ): ESTree.Node | estraverse.VisitorOption {
        if (this.collectedBlockStatementsLength < DeadCodeInjectionTransformer.minCollectedBlockStatementsCount) {
            return estraverse.VisitorOption.Break;
        }

        if (!this.collectedBlockStatements.length) {
            return estraverse.VisitorOption.Break;
        }

        if (this.randomGenerator.getMathRandom() > this.options.deadCodeInjectionThreshold) {
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
        const clonedBlockStatementNode: ESTree.BlockStatement = NodeUtils.clone(blockStatementNode);

        let nestedBlockStatementsCount: number = 0,
            isValidBlockStatementNode: boolean = true;

        estraverse.replace(clonedBlockStatementNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                /**
                 * First step: count nested block statements in current block statement
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
                    NodeGuards.isContinueStatementNode(node)
                ) {
                    isValidBlockStatementNode = false;

                    return estraverse.VisitorOption.Break;
                }

                /**
                 * Second step: rename all identifiers (except identifiers in member expressions)
                 * in current block statement
                 */
                if (NodeGuards.isIdentifierNode(node) && !NodeGuards.isMemberExpressionNode(parentNode)) {
                    node.name = this.randomGenerator.getRandomVariableName(6);
                }

                return node;
            }
        });

        if (!isValidBlockStatementNode) {
            return;
        }

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

        let consequent: ESTree.BlockStatement,
            alternate: ESTree.BlockStatement;

        if ((random1 && random2) || (!random1 && !random2)) {
            consequent = blockStatementNode;
            alternate = randomBlockStatementNode;
        } else {
            consequent = randomBlockStatementNode;
            alternate = blockStatementNode;
        }

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
