import Events = NodeJS.Events;

import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';

export interface IObfuscationEventEmitter extends Events {
    /**
     * @param event
     * @param listener
     * @returns this
     */
    on(event: TObfuscationEvent, listener: Function): this;

    /**
     * @param event
     * @param listener
     * @returns this
     */
    once(event: TObfuscationEvent, listener: Function): this;
}
