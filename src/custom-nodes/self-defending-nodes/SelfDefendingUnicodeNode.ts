import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { IOptions } from '../../interfaces/IOptions';
import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';

import { AppendState } from '../../enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { SelfDefendingTemplate } from '../../templates/custom-nodes/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeAppender } from '../../node/NodeAppender';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { Utils } from '../../Utils';

export class SelfDefendingUnicodeNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {string}
     */
    protected callsControllerFunctionName: string;

    /**
     * @type {number}
     */
    protected randomStackTraceIndex: number;

    /**
     * @type {IStackTraceData[]}
     */
    protected stackTraceData: IStackTraceData[];

    /**
     * @param stackTraceData
     * @param callsControllerFunctionName
     * @param randomStackTraceIndex
     * @param options
     */
    constructor (
        stackTraceData: IStackTraceData[],
        callsControllerFunctionName: string,
        randomStackTraceIndex: number,
        options: IOptions
    ) {
        super(options);

        this.stackTraceData = stackTraceData;
        this.callsControllerFunctionName = callsControllerFunctionName;
        this.randomStackTraceIndex = randomStackTraceIndex;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        NodeAppender.appendNodeToOptimalBlockScope(
            this.stackTraceData,
            blockScopeNode,
            this.getNode(),
            this.randomStackTraceIndex
        );
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        return JavaScriptObfuscator.obfuscate(
            format(SelfDefendingTemplate(), {
                selfDefendingFunctionName: Utils.getRandomVariableName(),
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            }),
            Object.assign({},  NO_CUSTOM_NODES_PRESET, {
                seed: this.options.seed
            })
        ).getObfuscatedCode();
    }
}
