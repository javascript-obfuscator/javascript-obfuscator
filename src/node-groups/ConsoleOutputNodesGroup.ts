import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { ConsoleOutputDisableExpressionNode } from '../custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode';
import { NodeAppender } from '../NodeAppender';
import { NodeCallsControllerFunctionNode } from '../custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode';

export class ConsoleOutputNodesGroup extends AbstractNodesGroup {
    /**
     * @returns {Map<string, ICustomNode>}
     */
    public getNodes (): Map <string, ICustomNode> | undefined {
        if (!this.options.disableConsoleOutput) {
            return;
        }

        const callsControllerFunctionName: string = 'consoleOutputNodeCallsControllerFunction';
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);

        return this.syncCustomNodesWithNodesGroup(new Map <string, ICustomNode> ([
            [
                'consoleOutputDisableExpressionNode',
                new ConsoleOutputDisableExpressionNode(
                    this.stackTraceData,
                    callsControllerFunctionName,
                    randomStackTraceIndex,
                    this.options
                )
            ],
            [
                'ConsoleOutputNodeCallsControllerFunctionNode',
                new NodeCallsControllerFunctionNode(
                    this.stackTraceData,
                    callsControllerFunctionName,
                    randomStackTraceIndex,
                    this.options
                )
            ]
        ]));
    }
}
