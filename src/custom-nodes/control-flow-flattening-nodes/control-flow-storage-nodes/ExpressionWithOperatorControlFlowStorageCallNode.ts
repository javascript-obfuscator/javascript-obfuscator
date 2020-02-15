import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import type { Expression } from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../../decorators/Initializable';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { NodeFactory } from '../../../node/NodeFactory';
import { NodeUtils } from '../../../node/NodeUtils';

@injectable()
export class ExpressionWithOperatorControlFlowStorageCallNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    private controlFlowStorageKey!: string;

    /**
     * @type {string}
     */
    @initializable()
    private controlFlowStorageName!: string;

    /**
     * @type {Expression}
     */
    private leftValue!: Expression;

    /**
     * @type {ESTree.Expression}
     */
    private rightValue!: Expression;

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
     * @param {string} controlFlowStorageName
     * @param {string} controlFlowStorageKey
     * @param {Expression} leftValue
     * @param {Expression} rightValue
     */
    public initialize (
        controlFlowStorageName: string,
        controlFlowStorageKey: string,
        leftValue: Expression,
        rightValue: Expression,
    ): void {
        this.controlFlowStorageName = controlFlowStorageName;
        this.controlFlowStorageKey = controlFlowStorageKey;
        this.leftValue = leftValue;
        this.rightValue = rightValue;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const structure: TStatement = NodeFactory.expressionStatementNode(
            NodeFactory.callExpressionNode(
                NodeFactory.memberExpressionNode(
                    NodeFactory.identifierNode(this.controlFlowStorageName),
                    NodeFactory.identifierNode(this.controlFlowStorageKey)
                ),
                [
                    this.leftValue,
                    this.rightValue
                ]
            )
        );

        NodeUtils.parentizeAst(structure);

        return [structure];
    }
}
