import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TStatement } from '../../../types/node/TStatement';

import { IOptions } from '../../../interfaces/options/IOptions';

import { initializable } from '../../../decorators/Initializable';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { Nodes } from '../../../node/Nodes';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';

@injectable()
export class BinaryExpressionFunctionNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    private operator: string;

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
    public initialize (operator: string): void {
        this.operator = operator;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return [
            Nodes.getFunctionDeclarationNode(
                RandomGeneratorUtils.getRandomVariableName(1),
                [
                    Nodes.getIdentifierNode('x'),
                    Nodes.getIdentifierNode('y')
                ],
                Nodes.getBlockStatementNode([
                    Nodes.getReturnStatementNode(
                        Nodes.getBinaryExpressionNode(
                            <any>this.operator,
                            Nodes.getIdentifierNode('x'),
                            Nodes.getIdentifierNode('y')
                        )
                    )
                ])
            )
        ];
    }
}
