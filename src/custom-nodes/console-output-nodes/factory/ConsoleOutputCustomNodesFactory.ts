import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { ConsoleOutputDisableExpressionNode } from '../ConsoleOutputDisableExpressionNode';
import { NodeCallsControllerFunctionNode } from '../../node-calls-controller-nodes/NodeCallsControllerFunctionNode';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { NodeAppender } from '../../../node/NodeAppender';
import { Utils } from '../../../Utils';

@injectable()
export class ConsoleOutputCustomNodesFactory extends AbstractCustomNodesFactory {
    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param stackTraceData
     * @returns {Map<string, ICustomNode>}
     */
    public initializeCustomNodes (stackTraceData: IStackTraceData[]): Map <string, ICustomNode> | undefined {
        if (!this.options.disableConsoleOutput) {
            return;
        }

        const callsControllerFunctionName: string = Utils.getRandomVariableName();
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(stackTraceData.length);

        const consoleOutputDisableExpressionNode: ICustomNode = new ConsoleOutputDisableExpressionNode(this.options);
        const nodeCallsControllerFunctionNode: ICustomNode = new NodeCallsControllerFunctionNode(this.options);

        consoleOutputDisableExpressionNode.initialize(callsControllerFunctionName, randomStackTraceIndex);
        nodeCallsControllerFunctionNode.initialize(callsControllerFunctionName, randomStackTraceIndex);

        return this.syncCustomNodesWithNodesFactory(new Map <string, ICustomNode> ([
            ['consoleOutputDisableExpressionNode', consoleOutputDisableExpressionNode],
            ['ConsoleOutputNodeCallsControllerFunctionNode', nodeCallsControllerFunctionNode]
        ]));
    }
}
