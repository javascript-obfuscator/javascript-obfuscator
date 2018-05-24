import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { LogicalOperator } from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class LogicalExpressionFunctionNode extends AbstractCustomNode {
    /**
     * @type {LogicalOperator}
     */
    @initializable()
    private operator!: LogicalOperator;

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
     * @param {LogicalOperator} operator
     */
    public initialize (operator: LogicalOperator): void {
        this.operator = operator;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const structure: TStatement = NodeFactory.expressionStatementNode(
            NodeFactory.functionExpressionNode(
                [
                    NodeFactory.identifierNode('x'),
                    NodeFactory.identifierNode('y')
                ],
                NodeFactory.blockStatementNode([
                    NodeFactory.returnStatementNode(
                        NodeFactory.logicalExpressionNode(
                            this.operator,
                            NodeFactory.identifierNode('x'),
                            NodeFactory.identifierNode('y')
                        )
                    )
                ])
            )
        );

        NodeUtils.parentizeAst(structure);

        return [structure];
    }
}
