import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';

import { ICustomNode } from './ICustomNode';
import { IInitializable } from '../IInitializable';
import { IStackTraceData } from '../stack-trace-analyzer/IStackTraceData';

import { CustomNode } from '../../enums/container/custom-nodes/CustomNode';
import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';

export interface ICustomNodeGroup extends IInitializable {
    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    appendCustomNodes (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void;

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
