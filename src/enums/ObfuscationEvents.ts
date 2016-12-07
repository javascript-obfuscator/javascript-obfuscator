import { TObfuscationEvent } from '../types/event-emitters/TObfuscationEvent';

import { Utils } from '../utils/Utils';

export const ObfuscationEvents: {
    AfterObfuscation: TObfuscationEvent,
    BeforeObfuscation: TObfuscationEvent
} = Utils.strEnumify({
    AfterObfuscation: 'afterObfuscation',
    BeforeObfuscation: 'beforeObfuscation'
});
