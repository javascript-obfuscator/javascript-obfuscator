import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { TemplateObjectTemplate } from './templates/template-object/TemplateObjectTemplate';

import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
import { NodeUtils } from '../../node/NodeUtils';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';

@injectable()
export class TemplateObjectCodeHelper extends AbstractCustomCodeHelper {
    /**
     * @type {string}
     */
    @initializable()
    private taggedTemplateLiteralHelperName!: string;

    /**
     * @type {string}
     */
    @initializable()
    private templateObjectHelperName!: string;

    /**
     * @type {string[]}
     */
    @initializable()
    private templateObjectValues!: string[];

    /**
     * @type {string[] | null}
     */
    @initializable()
    private templateObjectRawValues!: string[] | null;

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
     * @param {string} templateObjectHelperName
     * @param {string} taggedTemplateLiteralHelperName
     * @param {string[]} templateObjectValues
     * @param {string[] | null} templateObjectRawValues
     */
    public initialize (
        templateObjectHelperName: string,
        taggedTemplateLiteralHelperName: string,
        templateObjectValues: string[],
        templateObjectRawValues: string[] | null,
    ): void {
        this.templateObjectHelperName = templateObjectHelperName;
        this.taggedTemplateLiteralHelperName = taggedTemplateLiteralHelperName;
        this.templateObjectValues = templateObjectValues;
        this.templateObjectRawValues = templateObjectRawValues;
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
        return this.customCodeHelperFormatter.formatTemplate(TemplateObjectTemplate(), {
            taggedTemplateLiteralHelperName: this.taggedTemplateLiteralHelperName,
            templateObjectHelperName: this.templateObjectHelperName,
            templateObjectValues: this.formatTemplateObjectValuesToString(this.templateObjectValues),
            templateObjectRawValues: this.templateObjectRawValues
                ? this.formatTemplateObjectValuesToString(this.templateObjectRawValues)
                : undefined
        });
    }

    /**
     * @param {string[]} values
     * @returns {string}
     */
    private formatTemplateObjectValuesToString (values: string[]): string {
        return values
            .map((value: string) => `'${this.escapeSequenceEncoder.encode(
                value,
                this.options.unicodeEscapeSequence
            )}'`)
            .toString();
    }
}
