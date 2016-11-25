import { EventEmitter } from 'events';

import { ICustomNode } from './ICustomNode';
import { IStackTraceData } from '../stack-trace-analyzer/IStackTraceData';

export interface ICustomNodesFactory {
    /**
     * @returns {Map <string, ICustomNode> | undefined}
     */
    initializeCustomNodes (stackTraceData: IStackTraceData[]): Map <string, ICustomNode> | undefined;
}
