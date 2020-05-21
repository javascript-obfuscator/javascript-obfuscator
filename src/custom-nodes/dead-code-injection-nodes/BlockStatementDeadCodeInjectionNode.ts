import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import type { BinaryOperator, BlockStatement } from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class BlockStatementDeadCodeInjectionNode extends AbstractCustomNode {
    /**
     * @type {BlockStatement}
     */
    private blockStatementNode!: BlockStatement;

    /**
     * @type {BlockStatement}
     */
    private deadCodeInjectionRootAstHostNode!: BlockStatement;

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
     * Have to override parent method to prevent a change of kinds of variables
     *
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        return this.getNodeStructure();
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
