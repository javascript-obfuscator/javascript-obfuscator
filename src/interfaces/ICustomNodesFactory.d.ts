import { EventEmitter } from 'events';

import { ICustomNode } from './custom-nodes/ICustomNode';
import { IStackTraceData } from './stack-trace-analyzer/IStackTraceData';

export interface ICustomNodesFactory {
    /**
     * @returns {Map <string, ICustomNode> | undefined}
     */
    initializeCustomNodes (eventEmitter: EventEmitter, stackTraceData: IStackTraceData[]): Map <string, ICustomNode> | undefined;
}
