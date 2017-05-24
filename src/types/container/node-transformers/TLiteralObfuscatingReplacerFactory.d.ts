import { IObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/IObfuscatingReplacer';

import { LiteralObfuscatingReplacers } from '../../../enums/container/node-transformers/LiteralObfuscatingReplacers';

export type TLiteralObfuscatingReplacerFactory = (replacer: LiteralObfuscatingReplacers) => IObfuscatingReplacer;
