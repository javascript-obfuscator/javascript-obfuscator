import { TNodeWithStatements } from '../../types/node/TNodeWithStatements';

import { ICustomCodeHelper } from './ICustomCodeHelper';
import { IInitializable } from '../IInitializable';
import { ICallsGraphData } from '../analyzers/calls-graph-analyzer/ICallsGraphData';

import { CustomCodeHelper } from '../../enums/custom-code-helpers/CustomCodeHelper';
import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';

export interface ICustomCodeHelperGroup extends IInitializable {
    /**
     * @param nodeWithStatements
     * @param callsGraphData
     */
    appendNodes (nodeWithStatements: TNodeWithStatements, callsGraphData: ICallsGraphData[]): void;

    /**
     * @returns {ObfuscationEvent}
     */
    getAppendEvent (): ObfuscationEvent;

    /**
     * @type {Map <CustomCodeHelper, ICustomCodeHelper>}
     */
    getCustomCodeHelpers (): Map <CustomCodeHelper, ICustomCodeHelper>;

    initialize (): void;
}
