import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';

import { initializable } from '../../decorators/Initializable';

import { SingleNodeCallControllerTemplate } from '../../templates/SingleNodeCallControllerTemplate';

import { NO_ADDITIONAL_NODES_PRESET } from '../../options/presets/NoCustomNodes';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscatorFacade';
import { NodeUtils } from '../../node/NodeUtils';
import { ICustomNodeFormatter } from '../../interfaces/custom-nodes/ICustomNodeFormatter';

@injectable()
export class NodeCallsControllerFunctionNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    protected callsControllerFunctionName!: string;

    /**
     * @type {ObfuscationEvent}
     */
    @initializable()
    private appendEvent!: ObfuscationEvent;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomNodeFormatter} customNodeFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomNodeFormatter) customNodeFormatter: ICustomNodeFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }

    /**
     * @param {ObfuscationEvent} appendEvent
     * @param {string} callsControllerFunctionName
     */
    public initialize (appendEvent: ObfuscationEvent, callsControllerFunctionName: string): void {
        this.appendEvent = appendEvent;
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
        if (this.appendEvent === ObfuscationEvent.AfterObfuscation) {
            return JavaScriptObfuscator.obfuscate(
                this.customNodeFormatter.formatTemplate(SingleNodeCallControllerTemplate(), {
                    singleNodeCallControllerFunctionName: this.callsControllerFunctionName
                }),
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    identifierNamesGenerator: this.options.identifierNamesGenerator,
                    identifiersDictionary: this.options.identifiersDictionary,
                    seed: this.options.seed
                }
            ).getObfuscatedCode();
        }

        return this.customNodeFormatter.formatTemplate(SingleNodeCallControllerTemplate(), {
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
