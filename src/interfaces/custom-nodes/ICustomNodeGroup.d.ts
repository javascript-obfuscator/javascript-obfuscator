import { TNodeWithBlockScope } from '../../types/node/TNodeWithBlockScope';

import { ICustomNode } from './ICustomNode';
import { IInitializable } from '../IInitializable';
import { IStackTraceData } from '../analyzers/stack-trace-analyzer/IStackTraceData';

import { CustomNode } from '../../enums/custom-nodes/CustomNode';
import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';

export interface ICustomNodeGroup extends IInitializable {
    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    appendCustomNodes (blockScopeNode: TNodeWithBlockScope, stackTraceData: IStackTraceData[]): void;

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
