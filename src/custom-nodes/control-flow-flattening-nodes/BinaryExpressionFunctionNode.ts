import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { BinaryOperator } from 'estree';

import { TIdentifierNameGeneratorFactory } from '../../types/container/generators/TIdentifierNameGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class BinaryExpressionFunctionNode extends AbstractCustomNode {
    /**
     * @type {BinaryOperator}
     */
    @initializable()
    private operator: BinaryOperator;

    /**
     * @param {TIdentifierNameGeneratorFactory} identifierNameGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNameGenerator)
            identifierNameGeneratorFactory: TIdentifierNameGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNameGeneratorFactory, randomGenerator, options);
    }

    /**
     * @param {BinaryOperator} operator
     */
    public initialize (operator: BinaryOperator): void {
        this.operator = operator;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const structure: TStatement = Nodes.getFunctionDeclarationNode(
            this.randomGenerator.getRandomString(3),
            [
                Nodes.getIdentifierNode('x'),
                Nodes.getIdentifierNode('y')
            ],
            Nodes.getBlockStatementNode([
                Nodes.getReturnStatementNode(
                    Nodes.getBinaryExpressionNode(
                        this.operator,
                        Nodes.getIdentifierNode('x'),
                        Nodes.getIdentifierNode('y')
                    )
                )
            ])
        );

        NodeUtils.parentize(structure);

        return [structure];
    }
}
