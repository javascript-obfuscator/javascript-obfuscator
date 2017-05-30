import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';

export const ObfuscationEvent: {
    AfterObfuscation: TObfuscationEvent,
    BeforeObfuscation: TObfuscationEvent
} = {
    AfterObfuscation: 'afterObfuscation',
    BeforeObfuscation: 'beforeObfuscation'
};
