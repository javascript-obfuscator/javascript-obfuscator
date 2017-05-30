import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from './ICustomNode';
import { IInitializable } from '../IInitializable';
import { IStackTraceData } from '../stack-trace-analyzer/IStackTraceData';

import { CustomNode } from '../../enums/container/custom-nodes/CustomNode';

export interface ICustomNodeGroup extends IInitializable {
    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    appendCustomNodes (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void;

    /**
     * @returns {TObfuscationEvent}
     */
    getAppendEvent (): TObfuscationEvent;

    /**
     * @type {Map <CustomNode, ICustomNode>}
     */
    getCustomNodes (): Map <CustomNode, ICustomNode>;


    initialize (): void;
}
