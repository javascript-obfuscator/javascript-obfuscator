import { ICustomNode } from './ICustomNode';
import { IInitializable } from '../IInitializable';
import { IStackTraceData } from '../stack-trace-analyzer/IStackTraceData';

export interface ICustomNodeGroup extends IInitializable {
    /**
     * @type {Map <string, ICustomNode>}
     */
    getCustomNodes (): Map <string, ICustomNode>;

    /**
     * @type {string}
     */
    getGroupName (): string;

    /**
     * @returns {Map <string, ICustomNode> | undefined}
     */
    initialize (stackTraceData: IStackTraceData[]): void;
}
