import { IObfuscatingReplacer } from '../../interfaces/node-transformers/IObfuscatingReplacer';

import { ObfuscationReplacers } from '../../enums/container/ObfuscationReplacers';

export type TObfuscationReplacerFactory = (replacer: ObfuscationReplacers) => IObfuscatingReplacer;
