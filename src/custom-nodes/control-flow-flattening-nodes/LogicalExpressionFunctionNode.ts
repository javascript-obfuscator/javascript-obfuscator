import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { LogicalOperator } from 'estree';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { Nodes } from '../../node/Nodes';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class LogicalExpressionFunctionNode extends AbstractCustomNode {
    /**
     * @type {LogicalOperator}
     */
    @initializable()
    private operator: LogicalOperator;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param operator
     */
    public initialize (operator: LogicalOperator): void {
        this.operator = operator;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const structure: TStatement = Nodes.getFunctionDeclarationNode(
            RandomGeneratorUtils.getRandomVariableName(1, true, false),
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
