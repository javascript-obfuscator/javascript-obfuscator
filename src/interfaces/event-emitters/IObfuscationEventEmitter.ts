import * as ESTree from 'estree';

import { ICallsGraphData } from '../analyzers/calls-graph-analyzer/ICallsGraphData';

import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';

export interface IObfuscationEventEmitter {
    /**
     * @param {ObfuscationEvent} event
     * @param args
     * @returns {boolean}
     */
    emit (event: ObfuscationEvent, ...args: [ESTree.Program, ICallsGraphData[]]): boolean;

    /**
     * @param event
     * @param listener
     * @returns this
     */
    on (event: ObfuscationEvent, listener: Function): this;

    /**
     * @param event
     * @param listener
     * @returns this
     */
    once (event: ObfuscationEvent, listener: Function): this;
}
