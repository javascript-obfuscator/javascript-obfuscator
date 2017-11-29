import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNameGeneratorFactory } from '../../types/container/generators/TIdentifierNameGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class CallExpressionFunctionNode extends AbstractCustomNode {
    /**
     * @type {(ESTree.Expression | ESTree.SpreadElement)[]}
     */
    @initializable()
    private expressionArguments: (ESTree.Expression | ESTree.SpreadElement)[];

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
     * @param {(Expression | SpreadElement)[]} expressionArguments
     */
    public initialize (expressionArguments: (ESTree.Expression | ESTree.SpreadElement)[]): void {
        this.expressionArguments = expressionArguments;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const calleeIdentifier: ESTree.Identifier = Nodes.getIdentifierNode('callee');
        const params: ESTree.Identifier[] = [];
        const argumentsLength: number = this.expressionArguments.length;

        for (let i: number = 0; i < argumentsLength; i++) {
            params.push(Nodes.getIdentifierNode(`param${i + 1}`));
        }

        const structure: TStatement = Nodes.getFunctionDeclarationNode(
            this.randomGenerator.getRandomString(3),
            [
                calleeIdentifier,
                ...params
            ],
            Nodes.getBlockStatementNode([
                Nodes.getReturnStatementNode(
                    Nodes.getCallExpressionNode(
                        calleeIdentifier,
                        params
                    )
                )
            ])
        );

        NodeUtils.parentize(structure);

        return [structure];
    }
}
