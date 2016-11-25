import { TObfuscationEvent } from '../types/TObfuscationEvent';

import { Utils } from '../Utils';

export const ObfuscationEvents: {
    AfterObfuscation: TObfuscationEvent,
    BeforeObfuscation: TObfuscationEvent
} = Utils.strEnumify({
    AfterObfuscation: 'afterObfuscation',
    BeforeObfuscation: 'beforeObfuscation'
});
