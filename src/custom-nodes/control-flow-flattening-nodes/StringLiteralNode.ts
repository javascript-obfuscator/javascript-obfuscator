import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ICustomNodeFormatter } from '../../interfaces/custom-nodes/ICustomNodeFormatter';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeFactory } from '../../node/NodeFactory';

@injectable()
export class StringLiteralNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    private literalValue!: string;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomNodeFormatter} customNodeFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomNodeFormatter) customNodeFormatter: ICustomNodeFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }

    /**
     * @param {string} literalValue
     */
    public initialize (literalValue: string): void {
        this.literalValue = literalValue;
    }

    /**
     * @param {string} nodeTemplate
     * @returns {TStatement[]}
     */
    protected getNodeStructure (nodeTemplate: string): TStatement[] {
        const structure: TStatement = NodeFactory.expressionStatementNode(
            NodeFactory.literalNode(this.literalValue)
        );

        return [structure];
    }
}
