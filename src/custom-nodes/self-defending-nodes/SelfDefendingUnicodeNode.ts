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

import { SelfDefendingTemplate } from '../../templates/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscatorFacade';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class SelfDefendingUnicodeNode extends AbstractCustomNode {
    /**
     * @type {IEscapeSequenceEncoder}
     */
    private readonly escapeSequenceEncoder: IEscapeSequenceEncoder;

    /**
     * @type {string}
     */
    @initializable()
    private callsControllerFunctionName: string;

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
     * @param {string} callsControllerFunctionName
     */
    public initialize (callsControllerFunctionName: string): void {
        this.callsControllerFunctionName = callsControllerFunctionName;
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
        return JavaScriptObfuscator.obfuscate(
            format(SelfDefendingTemplate(this.escapeSequenceEncoder), {
                selfDefendingFunctionName: this.identifierNameGenerator.generate(6),
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            }),
            {
                ...NO_CUSTOM_NODES_PRESET,
                mangle: this.options.mangle,
                seed: this.options.seed,
                unicodeEscapeSequence: true
            }
        ).getObfuscatedCode();
    }
}
