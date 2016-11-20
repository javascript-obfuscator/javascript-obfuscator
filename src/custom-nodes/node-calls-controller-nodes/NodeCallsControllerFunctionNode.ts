import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { IOptions } from '../../interfaces/IOptions';
import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';

import { AppendState } from '../../enums/AppendState';

import { SingleNodeCallControllerTemplate } from '../../templates/custom-nodes/SingleNodeCallControllerTemplate';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeAppender } from '../../node/NodeAppender';

export class NodeCallsControllerFunctionNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

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
        let targetBlockScope: TNodeWithBlockStatement;

        if (this.stackTraceData.length) {
            targetBlockScope = NodeAppender
                .getOptimalBlockScope(this.stackTraceData, this.randomStackTraceIndex, 1);
        } else {
            targetBlockScope = blockScopeNode;
        }

        NodeAppender.prependNode(targetBlockScope, this.getNode());
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        if (this.appendState === AppendState.AfterObfuscation) {
            return JavaScriptObfuscator.obfuscate(
                SingleNodeCallControllerTemplate().formatUnicorn({
                    singleNodeCallControllerFunctionName: this.callsControllerFunctionName
                }),
                NO_CUSTOM_NODES_PRESET
            ).getObfuscatedCode();
        }

        return SingleNodeCallControllerTemplate().formatUnicorn({
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
