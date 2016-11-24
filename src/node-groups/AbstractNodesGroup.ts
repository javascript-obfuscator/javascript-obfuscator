import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodesGroup } from '../interfaces/INodesGroup';
import { IOptions } from '../interfaces/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { AppendState } from '../enums/AppendState';

export abstract class AbstractNodesGroup implements INodesGroup {
    /**
     * @type {AppendState}
     */
    protected readonly appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @type {IStackTraceData[]}
     */
    protected readonly stackTraceData: IStackTraceData[];

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @param stackTraceData
     * @param options
     */
    constructor (stackTraceData: IStackTraceData[], options: IOptions) {
        this.stackTraceData = stackTraceData;
        this.options = options;
    }

    /**
     * @returns {Map<string, ICustomNode> | undefined}
     */
    public abstract getNodes (): Map <string, ICustomNode> | undefined;

    /**
     * @param customNodes
     * @returns {Map<string, ICustomNode>}
     */
    protected syncCustomNodesWithNodesGroup (customNodes: Map <string, ICustomNode>): Map <string, ICustomNode> {
        customNodes.forEach((node: ICustomNode) => {
            node.setAppendState(this.appendState);
        });

        return customNodes;
    }
}
