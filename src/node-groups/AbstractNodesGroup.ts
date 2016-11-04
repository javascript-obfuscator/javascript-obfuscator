import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';

import { INodesGroup } from '../interfaces/INodesGroup';
import { IOptions } from '../interfaces/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

export abstract class AbstractNodesGroup implements INodesGroup {
    /**
     * @type {Map<string, AbstractCustomNode>}
     */
    protected nodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ();

    /**
     * @type {IStackTraceData[]}
     */
    protected stackTraceData: IStackTraceData[];

    /**
     * @type {IOptions}
     */
    protected options: IOptions;

    /**
     * @param stackTraceData
     * @param options
     */
    constructor (stackTraceData: IStackTraceData[], options: IOptions) {
        this.stackTraceData = stackTraceData;
        this.options = options;
    }

    /**
     * @returns {Map<string, ICustomNode>}
     */
    public getNodes (): Map <string, ICustomNode> {
        return this.nodes;
    }
}
