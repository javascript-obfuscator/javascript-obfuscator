import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';

import { IOptions } from '../../interfaces/options/IOptions';

import { ObfuscationEvents } from '../../enums/ObfuscationEvents';

import { initializable } from '../../decorators/Initializable';

import { SingleNodeCallControllerTemplate } from '../../templates/custom-nodes/SingleNodeCallControllerTemplate';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';

@injectable()
export class NodeCallsControllerFunctionNode extends AbstractCustomNode {
    /**
     * @type {TObfuscationEvent}
     */
    @initializable()
    private appendEvent: TObfuscationEvent;

    /**
     * @type {string}
     */
    @initializable()
    protected callsControllerFunctionName: string;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param appendEvent
     * @param callsControllerFunctionName
     */
    public initialize (appendEvent: TObfuscationEvent, callsControllerFunctionName: string): void {
        this.appendEvent = appendEvent;
        this.callsControllerFunctionName = callsControllerFunctionName;
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        if (this.appendEvent === ObfuscationEvents.AfterObfuscation) {
            return JavaScriptObfuscator.obfuscate(
                format(SingleNodeCallControllerTemplate(), {
                    singleNodeCallControllerFunctionName: this.callsControllerFunctionName
                }),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    seed: this.options.seed
                }
            ).getObfuscatedCode();
        }

        return format(SingleNodeCallControllerTemplate(), {
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
