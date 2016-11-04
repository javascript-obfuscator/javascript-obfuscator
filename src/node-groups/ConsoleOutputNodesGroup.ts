import { IOptions } from '../interfaces/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { ConsoleOutputDisableExpressionNode } from '../custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode';
import { NodeAppender } from '../NodeAppender';
import { NodeCallsControllerFunctionNode } from '../custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode';

export class ConsoleOutputNodesGroup extends AbstractNodesGroup {
    /**
     * @param stackTraceData
     * @param options
     */
    constructor (stackTraceData: IStackTraceData[], options: IOptions) {
        super(stackTraceData, options);

        if (!this.options.disableConsoleOutput) {
            return;
        }

        const callsControllerFunctionName: string = 'consoleOutputNodeCallsControllerFunction';
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);

        this.nodes.set(
            'consoleOutputDisableExpressionNode',
            new ConsoleOutputDisableExpressionNode(
                this.stackTraceData,
                callsControllerFunctionName,
                randomStackTraceIndex,
                this.options
            )
        );
        this.nodes.set(
            'ConsoleOutputNodeCallsControllerFunctionNode',
            new NodeCallsControllerFunctionNode(
                this.stackTraceData,
                callsControllerFunctionName,
                randomStackTraceIndex,
                this.options
            )
        );
    }
}
