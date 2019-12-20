import { decorate, injectable } from 'inversify';
import EventEmitter from 'eventemitter3';

import { IObfuscationEventEmitter } from '../interfaces/event-emitters/IObfuscationEventEmitter';

decorate(injectable(), EventEmitter);

@injectable()
export class ObfuscationEventEmitter extends EventEmitter implements IObfuscationEventEmitter {}
