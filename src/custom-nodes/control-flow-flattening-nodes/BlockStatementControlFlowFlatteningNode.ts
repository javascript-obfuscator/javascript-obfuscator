import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { StringSeparator } from '../../enums/StringSeparator';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class BlockStatementControlFlowFlatteningNode extends AbstractCustomNode {
    /**
     * @type {ESTree.Statement[]}
     */
    @initializable()
    private blockStatementBody!: ESTree.Statement[];

    /**
     * @type {number[]}
     */
    @initializable()
    private originalKeysIndexesInShuffledArray!: number[];

    /**
     * @type {number[]}
     */
    @initializable()
    private shuffledKeys!: number[];

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomCodeHelperFormatter} customCodeHelperFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomCodeHelperFormatter) customCodeHelperFormatter: ICustomCodeHelperFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            identifierNamesGeneratorFactory,
            customCodeHelperFormatter,
            randomGenerator,
            options
        );
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

        const structure: ESTree.BlockStatement = NodeFactory.blockStatementNode([
            NodeFactory.variableDeclarationNode(
                [
                    NodeFactory.variableDeclaratorNode(
                        NodeFactory.identifierNode(controllerIdentifierName),
                        NodeFactory.callExpressionNode(
                            NodeFactory.memberExpressionNode(
                                NodeFactory.literalNode(
                                    this.originalKeysIndexesInShuffledArray.join(StringSeparator.VerticalLine)
                                ),
                                NodeFactory.identifierNode('split')
                            ),
                            [
                                NodeFactory.literalNode(StringSeparator.VerticalLine)
                            ]
                        )
                    )
                ],
                'const'
            ),
            NodeFactory.variableDeclarationNode(
                [
                    NodeFactory.variableDeclaratorNode(
                        NodeFactory.identifierNode(indexIdentifierName),
                        NodeFactory.literalNode(0)
                    )
                ],
                'let'
            ),
            NodeFactory.whileStatementNode(
                NodeFactory.literalNode(true),
                NodeFactory.blockStatementNode([
                    NodeFactory.switchStatementNode(
                        NodeFactory.memberExpressionNode(
                            NodeFactory.identifierNode(controllerIdentifierName),
                            NodeFactory.updateExpressionNode(
                                '++',
                                NodeFactory.identifierNode(indexIdentifierName)
                            ),
                            true
                        ),
                        this.shuffledKeys.map((key: number, index: number) => {
                            const statement: ESTree.Statement = this.blockStatementBody[key];
                            const consequent: ESTree.Statement[] = [statement];

                            /**
                             * We shouldn't add continue statement after return statement
                             * to prevent `unreachable code after return statement` warnings
                             */
                            if (!NodeGuards.isReturnStatementNode(statement)) {
                                consequent.push(NodeFactory.continueStatement());
                            }

                            return NodeFactory.switchCaseNode(
                                NodeFactory.literalNode(String(index)),
                                consequent
                            );
                        })
                    ),
                    NodeFactory.breakStatement()
                ])
            )
        ]);

        NodeUtils.parentizeAst(structure);

        return [structure];
    }
}
