import { IObfuscationReplacer } from '../../interfaces/node-transformers/IObfuscationReplacer';

import { ObfuscationReplacers } from '../../enums/container/ObfuscationReplacers';

export type TObfuscationReplacerFactory = (replacer: ObfuscationReplacers) => IObfuscationReplacer;
