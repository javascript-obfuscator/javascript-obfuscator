import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IVisitor } from '../../interfaces/IVisitor';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';

@injectable()
export class DeadCodeInjectionTransformer extends AbstractNodeTransformer {
    /**
     * @type {number}
     */
    private static maxNestedBlockStatementsCount: number = 4;

    /**
     * @type {ESTree.BlockStatement[]}
     */
    private collectedBlockStatements: ESTree.BlockStatement[] = [];

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param targetNode
     * @param collectedBlockStatements
     */
    private static collectBlockStatementNodes (targetNode: ESTree.Node, collectedBlockStatements: ESTree.BlockStatement[]): void {
        if (!Node.isBlockStatementNode(targetNode) || !DeadCodeInjectionTransformer.isValidBlockStatementNode(targetNode)) {
            return;
        }

        const clonedBlockStatementNode: ESTree.BlockStatement = <ESTree.BlockStatement>NodeUtils.clone(targetNode);

        estraverse.replace(clonedBlockStatementNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isIdentifierNode(node)) {
                    node.name = RandomGeneratorUtils.getRandomVariableName(6);
                }

                return node;
            }
        });

        collectedBlockStatements.push(clonedBlockStatementNode);
    }

    /**
     * @param blockStatementNode
     * @return {boolean}
     */
    private static isValidBlockStatementNode (blockStatementNode: ESTree.BlockStatement): boolean {
        let blockStatementsCount: number = 0,
            isValidBlockStatementNode: boolean = true;

        estraverse.traverse(blockStatementNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (blockStatementNode !== node && Node.isBlockStatementNode(node)) {
                    blockStatementsCount++;
                }

                if (
                    blockStatementsCount > DeadCodeInjectionTransformer.maxNestedBlockStatementsCount ||
                    Node.isBreakStatementNode(node) ||
                    Node.isContinueStatementNode(node)
                ) {
                    isValidBlockStatementNode = false;
                }
            }
        });

        return isValidBlockStatementNode;
    }

    /**
     * @param blockStatementNode
     * @param randomBlockStatementNode
     * @return {ESTree.BlockStatement}
     */
    private static replaceBlockStatementNodes (
        blockStatementNode: ESTree.BlockStatement,
        randomBlockStatementNode: ESTree.BlockStatement
    ): ESTree.BlockStatement {
        const random1: boolean = RandomGeneratorUtils.getMathRandom() > 0.5;
        const random2: boolean = RandomGeneratorUtils.getMathRandom() > 0.5;

        const operator: ESTree.BinaryOperator = random1 ? '===' : '!==';
        const leftString: string = RandomGeneratorUtils.getRandomString(3);
        const rightString: string = random2 ? leftString : RandomGeneratorUtils.getRandomString(3);

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

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            leave: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isProgramNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param programNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (programNode: ESTree.Program, parentNode: ESTree.Node): ESTree.Node {
        this.transformProgramNode(programNode);

        return programNode;
    }

    /**
     * @param programNode
     */
    private transformProgramNode (programNode: ESTree.Program): void {
        estraverse.traverse(programNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any =>
                DeadCodeInjectionTransformer.collectBlockStatementNodes(node, this.collectedBlockStatements)
        });

        if (this.collectedBlockStatements.length < 10) {
            //return;
        }

        estraverse.replace(programNode, {
            leave: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (
                    !Node.isBlockStatementNode(node) ||
                    RandomGeneratorUtils.getMathRandom() > this.options.deadCodeInjectionThreshold
                ) {
                    return node;
                }

                const randomIndex: number = RandomGeneratorUtils.getRandomInteger(0, this.collectedBlockStatements.length - 1);
                const randomBlockStatementNode: ESTree.BlockStatement = this.collectedBlockStatements.splice(randomIndex, 1)[0];

                if (randomBlockStatementNode === node) {
                    return node;
                }

                return DeadCodeInjectionTransformer.replaceBlockStatementNodes(node, randomBlockStatementNode);
            }
        });
    }
}
