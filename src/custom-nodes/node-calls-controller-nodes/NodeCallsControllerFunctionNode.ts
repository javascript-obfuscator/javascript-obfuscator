import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';

import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';

import { initializable } from '../../decorators/Initializable';

import { SingleNodeCallControllerTemplate } from '../../templates/custom-nodes/SingleNodeCallControllerTemplate';

import { NO_CUSTOM_NODES_PRESET } from '../../options/presets/NoCustomNodes';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
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
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
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
                    seed: this.options.seed
                }
            ).getObfuscatedCode();
        }

        return format(SingleNodeCallControllerTemplate(), {
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
