import { decorate, injectable } from 'inversify';

import { IObfuscationEventEmitter } from '../interfaces/IObfuscationEventEmitter';

import { EventEmitter } from 'events';

decorate(injectable(), EventEmitter);

@injectable()
export class ObfuscationEventEmitter extends EventEmitter implements IObfuscationEventEmitter {}