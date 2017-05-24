import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';

export const ObfuscationEvents: {
    AfterObfuscation: TObfuscationEvent,
    BeforeObfuscation: TObfuscationEvent
} = {
    AfterObfuscation: 'afterObfuscation',
    BeforeObfuscation: 'beforeObfuscation'
};
