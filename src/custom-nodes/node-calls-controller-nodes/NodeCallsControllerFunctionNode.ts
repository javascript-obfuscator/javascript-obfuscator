import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TIdentifierNameGeneratorFactory } from '../../types/container/generators/TIdentifierNameGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';

import { initializable } from '../../decorators/Initializable';

import { SingleNodeCallControllerTemplate } from '../../templates/SingleNodeCallControllerTemplate';

import { NO_CUSTOM_NODES_PRESET } from '../../options/presets/NoCustomNodes';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscatorFacade';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class NodeCallsControllerFunctionNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    protected callsControllerFunctionName: string;

    /**
     * @type {ObfuscationEvent}
     */
    @initializable()
    private appendEvent: ObfuscationEvent;

    /**
     * @param {TIdentifierNameGeneratorFactory} identifierNameGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNameGenerator)
            identifierNameGeneratorFactory: TIdentifierNameGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNameGeneratorFactory, randomGenerator, options);
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
                format(SingleNodeCallControllerTemplate(), {
                    singleNodeCallControllerFunctionName: this.callsControllerFunctionName
                }),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    mangle: this.options.mangle,
                    seed: this.options.seed
                }
            ).getObfuscatedCode();
        }

        return format(SingleNodeCallControllerTemplate(), {
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
