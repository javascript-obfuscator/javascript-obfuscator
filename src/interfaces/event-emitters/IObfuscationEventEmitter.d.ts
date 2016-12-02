import Events = NodeJS.Events;

import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';

export interface IObfuscationEventEmitter extends Events {
    on(event: TObfuscationEvent, listener: Function): this;
    once(event: TObfuscationEvent, listener: Function): this;
}
