import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomNodeFormatter } from '../../interfaces/custom-nodes/ICustomNodeFormatter';
import { ICustomNodeObfuscator } from '../../interfaces/custom-nodes/ICustomNodeObfuscator';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { SelfDefendingTemplate } from './templates/string-array-rotate-function-node/SelfDefendingTemplate';
import { StringArrayRotateFunctionTemplate } from './templates/string-array-rotate-function-node/StringArrayRotateFunctionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../node/NodeUtils';
import { NumberUtils } from '../../utils/NumberUtils';

@injectable()
export class StringArrayRotateFunctionNode extends AbstractCustomNode {
    /**
     * @type {IEscapeSequenceEncoder}
     */
    private readonly escapeSequenceEncoder: IEscapeSequenceEncoder;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayName!: string;

    /**
     * @param {number}
     */
    @initializable()
    private stringArrayRotationAmount!: number;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomNodeFormatter} customNodeFormatter
     * @param {ICustomNodeObfuscator} customNodeObfuscator
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomNodeFormatter) customNodeFormatter: ICustomNodeFormatter,
        @inject(ServiceIdentifiers.ICustomNodeObfuscator) customNodeObfuscator: ICustomNodeObfuscator,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder
    ) {
        super(
            identifierNamesGeneratorFactory,
            customNodeFormatter,
            customNodeObfuscator,
            randomGenerator,
            options
        );

        this.escapeSequenceEncoder = escapeSequenceEncoder;
    }

    /**
     * @param {string} stringArrayName
     * @param {number} stringArrayRotationAmount
     */
    public initialize (
        stringArrayName: string,
        stringArrayRotationAmount: number
    ): void {
        this.stringArrayName = stringArrayName;
        this.stringArrayRotationAmount = stringArrayRotationAmount;
    }

    /**
     * @param {string} nodeTemplate
     * @returns {TStatement[]}
     */
    protected getNodeStructure (nodeTemplate: string): TStatement[] {
        return NodeUtils.convertCodeToStructure(nodeTemplate);
    }

    /**
     * @returns {string}
     */
    protected getNodeTemplate (): string {
        const timesName: string = this.identifierNamesGenerator.generate();
        const whileFunctionName: string = this.identifierNamesGenerator.generate();
        const preservedNames: string[] = [this.stringArrayName];

        let code: string = '';

        if (this.options.selfDefending) {
            code = this.customNodeFormatter.formatTemplate(SelfDefendingTemplate(this.escapeSequenceEncoder), {
                timesName,
                whileFunctionName
            });
        } else {
            code = `${whileFunctionName}(++${timesName})`;
        }

        return this.customNodeObfuscator.obfuscateTemplate(
            this.customNodeFormatter.formatTemplate(StringArrayRotateFunctionTemplate(), {
                code,
                timesName,
                whileFunctionName,
                stringArrayName: this.stringArrayName,
                stringArrayRotationAmount: NumberUtils.toHex(this.stringArrayRotationAmount)
            }),
            {
                reservedNames: preservedNames
            }
        );
    }
}
