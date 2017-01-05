import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { Node } from '../../../node/Node';
import { Nodes } from '../../../node/Nodes';
import { NodeUtils } from '../../../node/NodeUtils';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';
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
    ): ESTree.BlockStatement {
        if (BlockStatementControlFlowReplacer.blockStatementHasProhibitedStatements(blockStatementNode)) {
            return blockStatementNode;
        }

        const blockStatementStatements: ESTree.Statement[] = blockStatementNode.body;
        const blockStatementStatementsAsObject: any = Object.assign({}, blockStatementStatements);
        const originalKeys: number[] = Object.keys(blockStatementStatementsAsObject).map((key: string) => parseInt(key, 10));
        const shuffledKeys: number[] = Utils.arrayShuffle(originalKeys);
        const originalKeysIndexesInShuffledArray: number[] = originalKeys.map((key: number) => shuffledKeys.indexOf(key));

        if (blockStatementStatements.length <= 4) {
            return blockStatementNode;
        } else if (!blockStatementStatements.length) {
            blockStatementStatements.push(
                Nodes.getReturnStatementNode(
                    Nodes.getLiteralNode(true)
                )
            );
        }

        const controllerIdentifierName: string = RandomGeneratorUtils.getRandomString(3);
        const indexIdentifierName: string = RandomGeneratorUtils.getRandomString(3);

        blockStatementNode.body = [
            Nodes.getVariableDeclarationNode([
                Nodes.getVariableDeclaratorNode(
                    Nodes.getIdentifierNode(controllerIdentifierName),
                    Nodes.getCallExpressionNode(
                        Nodes.getMemberExpressionNode(
                            Nodes.getLiteralNode(
                                originalKeysIndexesInShuffledArray.join('|')
                            ),
                            Nodes.getIdentifierNode('split')
                        ),
                        [
                            Nodes.getLiteralNode('|')
                        ]
                    )
                ),
                Nodes.getVariableDeclaratorNode(
                    Nodes.getIdentifierNode(indexIdentifierName),
                    Nodes.getLiteralNode(0)
                )
            ]),
            Nodes.getWhileStatementNode(
                Nodes.getLiteralNode(true),
                Nodes.getBlockStatementNode([
                    Nodes.getSwitchStatementNode(
                        Nodes.getMemberExpressionNode(
                            Nodes.getIdentifierNode(controllerIdentifierName),
                            Nodes.getUpdateExpressionNode(
                                '++',
                                Nodes.getIdentifierNode(indexIdentifierName)
                            ),
                            true
                        ),
                        shuffledKeys.map((key: number, index: number) => {
                            return Nodes.getSwitchCaseNode(
                                Nodes.getLiteralNode(String(index)),
                                [
                                    blockStatementStatementsAsObject[key],
                                    Nodes.getContinueStatement()
                                ]
                            );
                        })
                    ),
                    Nodes.getBreakStatement()
                ])
            )
        ];

        NodeUtils.parentize(blockStatementNode);

        return blockStatementNode;
    }
}
