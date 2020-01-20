import { TNodeWithStatements } from '../../types/node/TNodeWithStatements';

import { ICustomNode } from './ICustomNode';
import { IInitializable } from '../IInitializable';
import { ICallsGraphData } from '../analyzers/calls-graph-analyzer/ICallsGraphData';

import { CustomNode } from '../../enums/custom-nodes/CustomNode';
import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';

export interface ICustomNodeGroup extends IInitializable {
    /**
     * @param nodeWithStatements
     * @param callsGraphData
     */
    appendCustomNodes (nodeWithStatements: TNodeWithStatements, callsGraphData: ICallsGraphData[]): void;

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
