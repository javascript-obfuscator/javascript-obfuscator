import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class BlockStatementControlFlowFlatteningNode extends AbstractCustomNode {
    /**
     * @type {ESTree.Statement[]}
     */
    @initializable()
    private blockStatementBody: ESTree.Statement[];

    /**
     * @type {number[]}
     */
    @initializable()
    private originalKeysIndexesInShuffledArray: number[];

    /**
     * @type {IRandomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

    /**
     * @type {number[]}
     */
    @initializable()
    private shuffledKeys: number[];

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.randomGenerator = randomGenerator;
    }

    /**
     * @param {Statement[]} blockStatementBody
     * @param {number[]} shuffledKeys
     * @param {number[]} originalKeysIndexesInShuffledArray
     */
    public initialize (
        blockStatementBody: ESTree.Statement[],
        shuffledKeys: number[],
        originalKeysIndexesInShuffledArray: number[]
    ): void {
        this.blockStatementBody = blockStatementBody;
        this.shuffledKeys = shuffledKeys;
        this.originalKeysIndexesInShuffledArray = originalKeysIndexesInShuffledArray;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const controllerIdentifierName: string = this.randomGenerator.getRandomString(6);
        const indexIdentifierName: string = this.randomGenerator.getRandomString(6);
        const structure: ESTree.BlockStatement = Nodes.getBlockStatementNode([
            Nodes.getVariableDeclarationNode([
                Nodes.getVariableDeclaratorNode(
                    Nodes.getIdentifierNode(controllerIdentifierName),
                    Nodes.getCallExpressionNode(
                        Nodes.getMemberExpressionNode(
                            Nodes.getLiteralNode(
                                this.originalKeysIndexesInShuffledArray.join('|')
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
                        this.shuffledKeys.map((key: number, index: number) => {
                            return Nodes.getSwitchCaseNode(
                                Nodes.getLiteralNode(String(index)),
                                [
                                    this.blockStatementBody[key],
                                    Nodes.getContinueStatement()
                                ]
                            );
                        })
                    ),
                    Nodes.getBreakStatement()
                ])
            )
        ]);

        NodeUtils.parentize(structure);

        return [structure];
    }
}
