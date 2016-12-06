import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from './ICustomNode';
import { IInitializable } from '../IInitializable';
import { IStackTraceData } from '../stack-trace-analyzer/IStackTraceData';

import { CustomNodes } from '../../enums/container/CustomNodes';

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
     * @type {Map <CustomNodes, ICustomNode>}
     */
    getCustomNodes (): Map <CustomNodes, ICustomNode>;


    initialize (): void;
}
