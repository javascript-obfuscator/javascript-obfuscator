import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { CustomNodes } from '../../../enums/container/CustomNodes';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { NodeAppender } from '../../../node/NodeAppender';
import { Utils } from '../../../Utils';

@injectable()
export class ConsoleOutputCustomNodesFactory extends AbstractCustomNodesFactory {
    /**
     * @type {TCustomNodeFactory}
     */
    private readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['Factory<ICustomNode>']) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.customNodeFactory = customNodeFactory;
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

        const consoleOutputDisableExpressionNode: ICustomNode = this.customNodeFactory(CustomNodes.ConsoleOutputDisableExpressionNode);
        const nodeCallsControllerFunctionNode: ICustomNode = this.customNodeFactory(CustomNodes.NodeCallsControllerFunctionNode);

        consoleOutputDisableExpressionNode.initialize(callsControllerFunctionName, randomStackTraceIndex);
        nodeCallsControllerFunctionNode.initialize(callsControllerFunctionName, randomStackTraceIndex);

        return this.syncCustomNodesWithNodesFactory(new Map <string, ICustomNode> ([
            ['consoleOutputDisableExpressionNode', consoleOutputDisableExpressionNode],
            ['ConsoleOutputNodeCallsControllerFunctionNode', nodeCallsControllerFunctionNode]
        ]));
    }
}
