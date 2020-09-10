import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayCallsWrapperNames } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayCallsWrapperNames';

import { initializable } from '../../decorators/Initializable';

import { SelfDefendingTemplate } from './templates/string-array-calls-wrapper/SelfDefendingTemplate';
import { StringArrayCallsWrapperTemplate } from './templates/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';
import { StringArrayCallsWrapperIntermediateTemplate } from './templates/string-array-calls-wrapper/StringArrayCallsWrapperIntermediateTemplate';

import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class StringArrayCallsWrapperCodeHelper extends AbstractCustomCodeHelper {
    /**
     * @type {string}
     */
    @initializable()
    protected stringArrayName!: string;

    /**
     * @type {IStringArrayCallsWrapperNames}
     */
    @initializable()
    protected stringArrayCallsWrapperNames!: IStringArrayCallsWrapperNames;

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
     * @param {IStringArrayCallsWrapperNames} stringArrayCallsWrapperNames
     */
    public initialize (
        stringArrayName: string,
        stringArrayCallsWrapperNames: IStringArrayCallsWrapperNames
    ): void {
        this.stringArrayName = stringArrayName;
        this.stringArrayCallsWrapperNames = stringArrayCallsWrapperNames;
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
        const intermediateTemplate: string = this.getIntermediateTemplate();

        const preservedNames: string[] = [`^${this.stringArrayName}$`];

        return this.customCodeHelperObfuscator.obfuscateTemplate(
            this.customCodeHelperFormatter.formatTemplate(StringArrayCallsWrapperTemplate(), {
                decodeCodeHelperTemplate,
                intermediateTemplate,
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperNames.name,
                stringArrayName: this.stringArrayName
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
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperNames.name,
                stringArrayName: this.stringArrayName
            }
        );
    }

    /**
     * @returns {string}
     */
    private getIntermediateTemplate (): string {
        const stringArrayCallsWrapperIntermediateNamesLength: number = this.stringArrayCallsWrapperNames
            .intermediateNames
            .length;

        let intermediateTemplate: string = '';

        for (let i = 0; i < stringArrayCallsWrapperIntermediateNamesLength; i++) {
            const intermediateName: string = this.stringArrayCallsWrapperNames.intermediateNames[i];

            intermediateTemplate += this.customCodeHelperFormatter.formatTemplate(
                StringArrayCallsWrapperIntermediateTemplate(),
                {
                    intermediateName,
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperNames.name
                }
            );
        }

        return intermediateTemplate;
    }
}
