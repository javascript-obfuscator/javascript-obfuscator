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

import { SelfDefendingTemplate } from './templates/string-array-calls-wrapper/SelfDefendingTemplate';
import { StringArrayCallsWrapperTemplate } from './templates/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';

import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class StringArrayCallsWrapperCodeHelper extends AbstractCustomCodeHelper {
    /**
     * @type {number}
     */
    @initializable()
    protected indexShiftAmount!: number;

    /**
     * @type {string}
     */
    @initializable()
    protected stringArrayName!: string;

    /**
     * @type {string}
     */
    @initializable()
    protected stringArrayCallsWrapperName!: string;

    /**
     * @type {IEscapeSequenceEncoder}
     */
    private readonly escapeSequenceEncoder: IEscapeSequenceEncoder;

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
     * @param {string} stringArrayCallsWrapperName
     * @param {number} indexShiftAmount
     */
    public initialize (
        stringArrayName: string,
        stringArrayCallsWrapperName: string,
        indexShiftAmount: number
    ): void {
        this.stringArrayName = stringArrayName;
        this.stringArrayCallsWrapperName = stringArrayCallsWrapperName;
        this.indexShiftAmount = indexShiftAmount;
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
        const decodeCodeHelperTemplate: string = this.getDecodeStringArrayTemplate();

        const preservedNames: string[] = [`^${this.stringArrayName}$`];

        return this.customCodeHelperObfuscator.obfuscateTemplate(
            this.customCodeHelperFormatter.formatTemplate(StringArrayCallsWrapperTemplate(), {
                decodeCodeHelperTemplate,
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                stringArrayName: this.stringArrayName,
                indexShiftAmount: this.indexShiftAmount
            }),
            {
                reservedNames: preservedNames
            }
        );
    }

    /**
     * @returns {string}
     */
    protected getDecodeStringArrayTemplate (): string {
        return '';
    }

    /**
     * @returns {string}
     */
    protected getSelfDefendingTemplate (): string {
        if (!this.options.selfDefending) {
            return '';
        }

        return this.customCodeHelperFormatter.formatTemplate(
            SelfDefendingTemplate(
                this.randomGenerator,
                this.escapeSequenceEncoder
            ),
            {
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                stringArrayName: this.stringArrayName
            }
        );
    }
}
