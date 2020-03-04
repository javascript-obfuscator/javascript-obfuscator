import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { SelfDefendingTemplate } from './templates/string-array-rotate-function/SelfDefendingTemplate';
import { StringArrayRotateFunctionTemplate } from './templates/string-array-rotate-function/StringArrayRotateFunctionTemplate';

import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
import { NodeUtils } from '../../node/NodeUtils';
import { NumberUtils } from '../../utils/NumberUtils';

@injectable()
export class StringArrayRotateFunctionCodeHelper extends AbstractCustomCodeHelper {
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
     * @param {ICustomCodeHelperFormatter} customCodeHelperFormatter
     * @param {ICustomCodeHelperObfuscator} customCodeHelperObfuscator
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomCodeHelperFormatter) customCodeHelperFormatter: ICustomCodeHelperFormatter,
        @inject(ServiceIdentifiers.ICustomCodeHelperObfuscator) customCodeHelperObfuscator: ICustomCodeHelperObfuscator,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder
    ) {
        super(
            identifierNamesGeneratorFactory,
            customCodeHelperFormatter,
            customCodeHelperObfuscator,
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
     * @param {string} codeHelperTemplate
     * @returns {TStatement[]}
     */
    protected getNodeStructure (codeHelperTemplate: string): TStatement[] {
        return NodeUtils.convertCodeToStructure(codeHelperTemplate);
    }

    /**
     * @returns {string}
     */
    protected getCodeHelperTemplate (): string {
        const timesName: string = this.identifierNamesGenerator.generateNext();
        const whileFunctionName: string = this.identifierNamesGenerator.generateNext();
        const preservedNames: string[] = [`^${this.stringArrayName}$`];

        let code: string = '';

        if (this.options.selfDefending) {
            code = this.customCodeHelperFormatter.formatTemplate(SelfDefendingTemplate(this.escapeSequenceEncoder), {
                timesName,
                whileFunctionName
            });
        } else {
            code = `${whileFunctionName}(++${timesName})`;
        }

        return this.customCodeHelperObfuscator.obfuscateTemplate(
            this.customCodeHelperFormatter.formatTemplate(StringArrayRotateFunctionTemplate(), {
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
