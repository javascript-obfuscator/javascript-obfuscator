import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../types/container/TCustomNodeFactory';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IVisitor } from '../../interfaces/IVisitor';

import { CustomNodes } from '../../enums/container/CustomNodes';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';
import { Utils } from '../../utils/Utils';

@injectable()
export class BlockStatementControlFlowTransformer extends AbstractNodeTransformer {
    /**
     * @type {TCustomNodeFactory}
     */
    private readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.customNodeFactory = customNodeFactory;
    }

    /**
     * @param blockStatementNode
     * @return {boolean}
     */
    private static blockStatementHasProhibitedStatements (blockStatementNode: ESTree.BlockStatement): boolean {
        return blockStatementNode.body.some((statement: ESTree.Statement) => {
            const isBreakOrContinueStatement: boolean = Node.isBreakStatementNode(statement) || Node.isContinueStatementNode(statement);
            const isVariableDeclarationWithLetOrConstKind: boolean = Node.isVariableDeclarationNode(statement) &&
                (statement.kind === 'const' ||  statement.kind === 'let');

            return Node.isFunctionDeclarationNode(statement) || isBreakOrContinueStatement || isVariableDeclarationWithLetOrConstKind;
        });
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            leave: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isBlockStatementNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param blockStatementNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (blockStatementNode: ESTree.BlockStatement, parentNode: ESTree.Node): ESTree.Node {
        if (
            RandomGeneratorUtils.getMathRandom() > this.options.controlFlowFlatteningThreshold ||
            BlockStatementControlFlowTransformer.blockStatementHasProhibitedStatements(blockStatementNode)
        ) {
            return blockStatementNode;
        }

        const blockStatementBody: ESTree.Statement[] = blockStatementNode.body;

        if (blockStatementBody.length <= 4) {
            return blockStatementNode;
        }

        const originalKeys: number[] = Utils.arrayRange(blockStatementBody.length);
        const shuffledKeys: number[] = Utils.arrayShuffle(originalKeys);
        const originalKeysIndexesInShuffledArray: number[] = originalKeys.map((key: number) => shuffledKeys.indexOf(key));
        const blockStatementControlFlowFlatteningCustomNode: ICustomNode = this.customNodeFactory(
            CustomNodes.BlockStatementControlFlowFlatteningNode
        );

        blockStatementControlFlowFlatteningCustomNode.initialize(
            blockStatementBody,
            shuffledKeys,
            originalKeysIndexesInShuffledArray
        );

        return blockStatementControlFlowFlatteningCustomNode.getNode()[0];
    }
}
