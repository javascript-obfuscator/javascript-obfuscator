import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ICustomNodeFormatter } from '../../interfaces/custom-nodes/ICustomNodeFormatter';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

import { initializable } from '../../decorators/Initializable';

import { AtobTemplate } from '../../templates/AtobTemplate';
import { GlobalVariableNoEvalTemplate } from '../../templates/GlobalVariableNoEvalTemplate';
import { Rc4Template } from '../../templates/Rc4Template';
import { SelfDefendingTemplate } from '../../templates/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate';
import { StringArrayBase64DecodeNodeTemplate } from '../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate';
import { StringArrayCallsWrapperTemplate } from '../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';
import { StringArrayRc4DecodeNodeTemplate } from '../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class StringArrayCallsWrapper extends AbstractCustomNode {
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
     * @param {ICustomNodeFormatter} customNodeFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomNodeFormatter) customNodeFormatter: ICustomNodeFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder
    ) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);

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
        const decodeNodeTemplate: string = this.getDecodeStringArrayTemplate();

        const preservedNames: string[] = [this.stringArrayName];

        return this.obfuscateTemplate(
            this.customNodeFormatter.formatTemplate(StringArrayCallsWrapperTemplate(), {
                decodeNodeTemplate,
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
        const atobPolyfill: string = this.customNodeFormatter.formatTemplate(AtobTemplate(), { globalVariableTemplate });

        let decodeStringArrayTemplate: string = '';
        let selfDefendingCode: string = '';

        if (this.options.selfDefending) {
            selfDefendingCode = this.customNodeFormatter.formatTemplate(
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
                decodeStringArrayTemplate = this.customNodeFormatter.formatTemplate(
                    StringArrayRc4DecodeNodeTemplate(this.randomGenerator),
                    {
                        atobPolyfill,
                        selfDefendingCode,
                        rc4Polyfill: Rc4Template(),
                        stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                    }
                );

                break;

            case StringArrayEncoding.Base64:
                decodeStringArrayTemplate = this.customNodeFormatter.formatTemplate(
                    StringArrayBase64DecodeNodeTemplate(this.randomGenerator),
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
