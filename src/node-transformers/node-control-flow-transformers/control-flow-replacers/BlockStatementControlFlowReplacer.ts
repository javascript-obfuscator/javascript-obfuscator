import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { CustomNodes } from '../../../enums/container/CustomNodes';
import { Node } from '../../../node/Node';
import { Utils } from '../../../utils/Utils';

@injectable()
export class BlockStatementControlFlowReplacer extends AbstractControlFlowReplacer {
    /**
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodeFactory, options);
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
     * @param blockStatementNode
     * @param parentNode
     * @param controlFlowStorage
     * @returns {ESTree.Node}
     */
    public replace (
        blockStatementNode: ESTree.BlockStatement,
        parentNode: ESTree.Node,
        controlFlowStorage: IStorage <ICustomNode>
    ): ESTree.Node {
        if (BlockStatementControlFlowReplacer.blockStatementHasProhibitedStatements(blockStatementNode)) {
            return blockStatementNode;
        }

        const blockStatementBody: ESTree.Statement[] = blockStatementNode.body;
        const originalKeys: number[] = [...Array(blockStatementBody.length).keys()];
        const shuffledKeys: number[] = Utils.arrayShuffle(originalKeys);
        const originalKeysIndexesInShuffledArray: number[] = originalKeys.map((key: number) => shuffledKeys.indexOf(key));

        if (blockStatementBody.length <= 4) {
            return blockStatementNode;
        }

        const blockStatementControlFlowReplacerCustomNode: ICustomNode = this.customNodeFactory(
            CustomNodes.BlockStatementControlFlowReplacerNode
        );
        
        blockStatementControlFlowReplacerCustomNode.initialize(
            blockStatementBody,
            shuffledKeys,
            originalKeysIndexesInShuffledArray
        );

        return blockStatementControlFlowReplacerCustomNode.getNode()[0];
    }
}
