import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { LogicalOperator } from 'estree';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class LogicalExpressionFunctionNode extends AbstractCustomNode {
    /**
     * @type {LogicalOperator}
     */
    @initializable()
    private operator: LogicalOperator;

    /**
     * @type {IRandomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

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
     * @param {LogicalOperator} operator
     */
    public initialize (operator: LogicalOperator): void {
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
                    Nodes.getLogicalExpressionNode(
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
