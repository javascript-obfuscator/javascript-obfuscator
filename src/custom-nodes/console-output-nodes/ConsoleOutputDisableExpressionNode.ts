import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { IOptions } from '../../interfaces/IOptions';
import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';

import { AppendState } from '../../enums/AppendState';

import { ConsoleOutputDisableExpressionTemplate } from '../../templates/custom-nodes/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeAppender } from '../../node/NodeAppender';
import { Utils } from '../../Utils';

export class ConsoleOutputDisableExpressionNode extends AbstractCustomNode {
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
        return ConsoleOutputDisableExpressionTemplate().formatUnicorn({
            consoleLogDisableFunctionName: Utils.getRandomVariableName(),
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
