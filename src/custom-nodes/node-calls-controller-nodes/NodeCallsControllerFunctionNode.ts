import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';

import { IOptions } from '../../interfaces/options/IOptions';
import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';

import { ObfuscationEvents } from '../../enums/ObfuscationEvents';

import { initializable } from '../../decorators/Initializable';

import { SingleNodeCallControllerTemplate } from '../../templates/custom-nodes/SingleNodeCallControllerTemplate';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeAppender } from '../../node/NodeAppender';

@injectable()
export class NodeCallsControllerFunctionNode extends AbstractCustomNode {
    /**
     * @type {TObfuscationEvent}
     */
    protected readonly appendEvent: TObfuscationEvent = ObfuscationEvents.BeforeObfuscation;

    /**
     * @type {string}
     */
    @initializable()
    protected callsControllerFunctionName: string;

    /**
     * @type {number}
     */
    @initializable()
    protected randomStackTraceIndex: number;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param callsControllerFunctionName
     * @param randomStackTraceIndex
     */
    public initialize (callsControllerFunctionName: string, randomStackTraceIndex: number): void {
        this.callsControllerFunctionName = callsControllerFunctionName;
        this.randomStackTraceIndex = randomStackTraceIndex;
    }

    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void {
        let targetBlockScope: TNodeWithBlockStatement;

        if (stackTraceData.length) {
            targetBlockScope = NodeAppender
                .getOptimalBlockScope(stackTraceData, this.randomStackTraceIndex, 1);
        } else {
            targetBlockScope = blockScopeNode;
        }

        NodeAppender.prependNode(targetBlockScope, this.getNode());
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
                Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                    seed: this.options.seed
                })
            ).getObfuscatedCode();
        }

        return format(SingleNodeCallControllerTemplate(), {
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
