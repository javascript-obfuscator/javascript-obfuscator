import { IObfuscationEventEmitter } from '../interfaces/IObfuscationEventEmitter';

import { EventEmitter } from 'events';

export class ObfuscationEventEmitter extends EventEmitter implements IObfuscationEventEmitter {}
