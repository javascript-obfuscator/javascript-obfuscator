import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

import { initializable } from '../../decorators/Initializable';

import { AtobTemplate } from './templates/string-array-calls-wrapper/AtobTemplate';
import { GlobalVariableNoEvalTemplate } from '../common/templates/GlobalVariableNoEvalTemplate';
import { Rc4Template } from './templates/string-array-calls-wrapper/Rc4Template';
import { SelfDefendingTemplate } from './templates/string-array-calls-wrapper/SelfDefendingTemplate';
import { StringArrayBase64DecodeTemplate } from './templates/string-array-calls-wrapper/StringArrayBase64DecodeTemplate';
import { StringArrayCallsWrapperTemplate } from './templates/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';
import { StringArrayRC4DecodeTemplate } from './templates/string-array-calls-wrapper/StringArrayRC4DecodeTemplate';

import { AbstractCustomCodeHelper } from '../AbstractCustomCodeHelper';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class StringArrayCallsWrapperCodeHelper extends AbstractCustomCodeHelper {
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
     * @type {string}
     */
    @initializable()
    private stringArrayCallsWrapperName!: string;

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
     */
    public initialize (
        stringArrayName: string,
        stringArrayCallsWrapperName: string
    ): void {
        this.stringArrayName = stringArrayName;
        this.stringArrayCallsWrapperName = stringArrayCallsWrapperName;
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
    private getDecodeStringArrayTemplate (): string {
        const globalVariableTemplate: string = this.options.target !== ObfuscationTarget.BrowserNoEval
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate();
        const atobPolyfill: string = this.customCodeHelperFormatter.formatTemplate(AtobTemplate(), { globalVariableTemplate });

        let decodeStringArrayTemplate: string = '';
        let selfDefendingCode: string = '';

        if (this.options.selfDefending) {
            selfDefendingCode = this.customCodeHelperFormatter.formatTemplate(
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

        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding.Rc4:
                decodeStringArrayTemplate = this.customCodeHelperFormatter.formatTemplate(
                    StringArrayRC4DecodeTemplate(this.randomGenerator),
                    {
                        atobPolyfill,
                        selfDefendingCode,
                        rc4Polyfill: Rc4Template(),
                        stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                    }
                );

                break;

            case StringArrayEncoding.Base64:
                decodeStringArrayTemplate = this.customCodeHelperFormatter.formatTemplate(
                    StringArrayBase64DecodeTemplate(this.randomGenerator),
                    {
                        atobPolyfill,
                        selfDefendingCode,
                        stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                    }
                );
        }

        return decodeStringArrayTemplate;
    }
}
