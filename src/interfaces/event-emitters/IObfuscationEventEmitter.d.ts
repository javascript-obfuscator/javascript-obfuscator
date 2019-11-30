import EventEmitter = NodeJS.EventEmitter;

import { ObfuscationEvent } from '../../enums/event-emitters/ObfuscationEvent';

export interface IObfuscationEventEmitter extends EventEmitter {
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
