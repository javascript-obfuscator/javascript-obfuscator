import { TNodeWithStatements } from '../../types/node/TNodeWithStatements';

import { ICustomNode } from './ICustomNode';
import { IInitializable } from '../IInitializable';
import { IStackTraceData } from '../analyzers/stack-trace-analyzer/IStackTraceData';

import { CustomNode } from '../../enums/custom-nodes/CustomNode';
import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';

export interface ICustomNodeGroup extends IInitializable {
    /**
     * @param nodeWithStatements
     * @param stackTraceData
     */
    appendCustomNodes (nodeWithStatements: TNodeWithStatements, stackTraceData: IStackTraceData[]): void;

    /**
     * @returns {ObfuscationEvent}
     */
    getAppendEvent (): ObfuscationEvent;

    /**
     * @type {Map <CustomNode, ICustomNode>}
     */
    getCustomNodes (): Map <CustomNode, ICustomNode>;

    initialize (): void;
}
