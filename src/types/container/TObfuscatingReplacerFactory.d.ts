import { IObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/IObfuscatingReplacer';

import { ObfuscatingReplacers } from '../../enums/container/ObfuscatingReplacers';

export type TObfuscatingReplacerFactory = (replacer: ObfuscatingReplacers) => IObfuscatingReplacer;
