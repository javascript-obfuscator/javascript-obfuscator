import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { BinaryOperator, BlockStatement } from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class BlockStatementDeadCodeInjectionNode extends AbstractCustomNode {
    /**
     * @type {BlockStatement}
     */
    @initializable()
    private blockStatementNode!: BlockStatement;

    /**
     * @type {BlockStatement}
     */
    @initializable()
    private deadCodeInjectionRootAstHostNode!: BlockStatement;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }

    /**
     * @param {BlockStatement} blockStatementNode
     * @param {BlockStatement} deadCodeInjectionRootAstHostNode
     */
    public initialize (
        blockStatementNode: BlockStatement,
        deadCodeInjectionRootAstHostNode: BlockStatement
    ): void {
        this.blockStatementNode = blockStatementNode;
        this.deadCodeInjectionRootAstHostNode = deadCodeInjectionRootAstHostNode;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const random1: boolean = this.randomGenerator.getMathRandom() > 0.5;
        const random2: boolean = this.randomGenerator.getMathRandom() > 0.5;

        const operator: BinaryOperator = random1 ? '===' : '!==';
        const leftString: string = this.randomGenerator.getRandomString(5);
        const rightString: string = random2 ? leftString : this.randomGenerator.getRandomString(5);

        const [consequent, alternate]: [BlockStatement, BlockStatement] = random1 === random2
            ? [this.blockStatementNode, this.deadCodeInjectionRootAstHostNode]
            : [this.deadCodeInjectionRootAstHostNode, this.blockStatementNode];

        const structure: BlockStatement = NodeFactory.blockStatementNode([
            NodeFactory.ifStatementNode(
                NodeFactory.binaryExpressionNode(
                    operator,
                    NodeFactory.literalNode(leftString),
                    NodeFactory.literalNode(rightString)
                ),
                consequent,
                alternate
            )
        ]);

        NodeUtils.parentizeAst(structure);

        return [structure];
    }
}
