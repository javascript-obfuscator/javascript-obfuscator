import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import format from 'string-template';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

import { initializable } from '../../decorators/Initializable';

import { NO_ADDITIONAL_NODES_PRESET } from '../../options/presets/NoCustomNodes';

import { AtobTemplate } from '../../templates/AtobTemplate';
import { GlobalVariableNoEvalTemplate } from '../../templates/GlobalVariableNoEvalTemplate';
import { Rc4Template } from '../../templates/Rc4Template';
import { SelfDefendingTemplate } from '../../templates/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate';
import { StringArrayBase64DecodeNodeTemplate } from '../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate';
import { StringArrayCallsWrapperTemplate } from '../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';
import { StringArrayRc4DecodeNodeTemplate } from '../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscatorFacade';
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
     * @param {IRandomGenerator} randomGenerator
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);

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
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(this.getTemplate());
    }

    /**
     * @returns {string}
     */
    protected getTemplate (): string {
        const decodeNodeTemplate: string = this.getDecodeStringArrayTemplate();

        return JavaScriptObfuscator.obfuscate(
            format(StringArrayCallsWrapperTemplate(), {
                decodeNodeTemplate,
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                stringArrayName: this.stringArrayName
            }),
            {
                ...NO_ADDITIONAL_NODES_PRESET,
                identifierNamesGenerator: this.options.identifierNamesGenerator,
                seed: this.options.seed
            }
        ).getObfuscatedCode();
    }

    /**
     * @returns {string}
     */
    private getDecodeStringArrayTemplate (): string {
        const globalVariableTemplate: string = this.options.target !== ObfuscationTarget.BrowserNoEval
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate();
        const atobPolyfill: string = format(AtobTemplate(), { globalVariableTemplate });

        let decodeStringArrayTemplate: string = '';
        let selfDefendingCode: string = '';

        if (this.options.selfDefending) {
            selfDefendingCode = format(
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
                decodeStringArrayTemplate = format(
                    StringArrayRc4DecodeNodeTemplate(this.randomGenerator),
                    {
                        atobPolyfill,
                        rc4Polyfill: Rc4Template(),
                        selfDefendingCode,
                        stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                    }
                );

                break;

            case StringArrayEncoding.Base64:
                decodeStringArrayTemplate = format(
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
