import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TIdentifierNameGeneratorFactory } from '../../types/container/generators/TIdentifierNameGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { NO_CUSTOM_NODES_PRESET } from '../../options/presets/NoCustomNodes';

import { SelfDefendingTemplate } from '../../templates/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate';
import { StringArrayRotateFunctionTemplate } from '../../templates/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscatorFacade';
import { NodeUtils } from '../../node/NodeUtils';
import { Utils } from '../../utils/Utils';

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
    private stringArrayName: string;

    /**
     * @param {number}
     */
    @initializable()
    private stringArrayRotateValue: number;

    /**
     * @param {TIdentifierNameGeneratorFactory} identifierNameGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNameGenerator)
            identifierNameGeneratorFactory: TIdentifierNameGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNameGeneratorFactory, randomGenerator, options);

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
        const timesName: string = this.identifierNameGenerator.generate(6);
        const whileFunctionName: string = this.identifierNameGenerator.generate(6);

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
                stringArrayRotateValue: Utils.decToHex(this.stringArrayRotateValue),
                whileFunctionName
            }),
            {
                ...NO_CUSTOM_NODES_PRESET,
                mangle: this.options.mangle,
                seed: this.options.seed
            }
        ).getObfuscatedCode();
    }
}
