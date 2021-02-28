import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';
import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class CallExpressionFunctionNode extends AbstractCustomNode {
    /**
     * @type {(ESTree.Expression | ESTree.SpreadElement)[]}
     */
    @initializable()
    private expressionArguments!: (ESTree.Expression | ESTree.SpreadElement)[];

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
     * @param {(Expression | SpreadElement)[]} expressionArguments
     */
    public initialize (expressionArguments: (ESTree.Expression | ESTree.SpreadElement)[]): void {
        this.expressionArguments = expressionArguments;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const calleeIdentifier: ESTree.Identifier = NodeFactory.identifierNode('callee');
        const params: (ESTree.Identifier | ESTree.RestElement)[] = [];
        const callArguments: (ESTree.Identifier | ESTree.SpreadElement)[] = [];
        const argumentsLength: number = this.expressionArguments.length;

        for (let i: number = 0; i < argumentsLength; i++) {
            const argument: ESTree.Expression | ESTree.SpreadElement = this.expressionArguments[i];
            const isSpreadCallArgument: boolean = NodeGuards.isSpreadElementNode(argument);

            const baseIdentifierNode: ESTree.Identifier = NodeFactory.identifierNode(`param${i + 1}`);

            params.push(
                isSpreadCallArgument
                    ? NodeFactory.restElementNode(baseIdentifierNode)
                    : baseIdentifierNode
            );
            callArguments.push(
                isSpreadCallArgument
                    ? NodeFactory.spreadElementNode(baseIdentifierNode)
                    : baseIdentifierNode
            );
        }

        const structure: TStatement = NodeFactory.expressionStatementNode(
            NodeFactory.functionExpressionNode(
                [
                    calleeIdentifier,
                    ...params
                ],
                NodeFactory.blockStatementNode([
                    NodeFactory.returnStatementNode(
                        NodeFactory.callExpressionNode(
                            calleeIdentifier,
                            callArguments
                        )
                    )
                ])
            )
        );

        NodeUtils.parentizeAst(structure);

        return [structure];
    }
}
