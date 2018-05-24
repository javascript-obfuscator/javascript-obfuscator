import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import format from 'string-template';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { NO_ADDITIONAL_NODES_PRESET } from '../../options/presets/NoCustomNodes';

import { SelfDefendingTemplate } from '../../templates/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate';
import { StringArrayRotateFunctionTemplate } from '../../templates/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscatorFacade';
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
    private stringArrayRotateValue!: number;

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
     * @param {number} stringArrayRotateValue
     */
    public initialize (
        stringArrayName: string,
        stringArrayRotateValue: number
    ): void {
        this.stringArrayName = stringArrayName;
        this.stringArrayRotateValue = stringArrayRotateValue;
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
        const timesName: string = this.identifierNamesGenerator.generate();
        const whileFunctionName: string = this.identifierNamesGenerator.generate();

        let code: string = '';

        if (this.options.selfDefending) {
            code = format(SelfDefendingTemplate(this.escapeSequenceEncoder), {
                timesName,
                whileFunctionName
            });
        } else {
            code = `${whileFunctionName}(++${timesName})`;
        }

        return JavaScriptObfuscator.obfuscate(
            format(StringArrayRotateFunctionTemplate(), {
                code,
                timesName,
                stringArrayName: this.stringArrayName,
                stringArrayRotateValue: NumberUtils.toHex(this.stringArrayRotateValue),
                whileFunctionName
            }),
            {
                ...NO_ADDITIONAL_NODES_PRESET,
                identifierNamesGenerator: this.options.identifierNamesGenerator,
                seed: this.options.seed
            }
        ).getObfuscatedCode();
    }
}
