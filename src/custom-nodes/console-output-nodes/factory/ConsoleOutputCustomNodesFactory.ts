import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { ConsoleOutputDisableExpressionNode } from '../ConsoleOutputDisableExpressionNode';
import { NodeCallsControllerFunctionNode } from '../../node-calls-controller-nodes/NodeCallsControllerFunctionNode';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { NodeAppender } from '../../../node/NodeAppender';
import { Utils } from '../../../Utils';

export class ConsoleOutputCustomNodesFactory extends AbstractCustomNodesFactory {
    /**
     * @returns {Map<string, ICustomNode>}
     */
    public initializeCustomNodes (): Map <string, ICustomNode> | undefined {
        if (!this.options.disableConsoleOutput) {
            return;
        }

        const callsControllerFunctionName: string = Utils.getRandomVariableName();
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);

        return this.syncCustomNodesWithNodesFactory(new Map <string, ICustomNode> ([
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
