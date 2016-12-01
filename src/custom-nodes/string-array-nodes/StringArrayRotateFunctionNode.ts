import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';

import { IOptions } from '../../interfaces/options/IOptions';
import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';
import { IStorage } from '../../interfaces/storages/IStorage';

import { ObfuscationEvents } from '../../enums/ObfuscationEvents';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { SelfDefendingTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate';
import { StringArrayRotateFunctionTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeAppender } from '../../node/NodeAppender';
import { Utils } from '../../Utils';

@injectable()
export class StringArrayRotateFunctionNode extends AbstractCustomNode {
    /**
     * @type {TObfuscationEvent}
     */
    protected readonly appendEvent: TObfuscationEvent = ObfuscationEvents.AfterObfuscation;

    /**
     * @type {IStorage <string>}
     */
    private stringArray: IStorage <string>;

    /**
     * @type {string}
     */
    private stringArrayName: string;

    /**
     * @param {number}
     */
    private stringArrayRotateValue: number;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param stringArray
     * @param stringArrayName
     * @param stringArrayRotateValue
     */
    public initialize (
        stringArray: IStorage <string>,
        stringArrayName: string,
        stringArrayRotateValue: number
    ): void {
        this.stringArray = stringArray;
        this.stringArrayName = stringArrayName;
        this.stringArrayRotateValue = stringArrayRotateValue;

        super.initialize();
    }

    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void {
        if (!this.stringArray.getLength()) {
            return;
        }

        NodeAppender.insertNodeAtIndex(blockScopeNode, this.getNode(), 1);
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        let code: string = '',
            timesName: string = Utils.getRandomVariableName(),
            whileFunctionName: string = Utils.getRandomVariableName();

        if (this.options.selfDefending) {
            code = format(SelfDefendingTemplate(), {
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
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                seed: this.options.seed
            })
        ).getObfuscatedCode();
    }
}
