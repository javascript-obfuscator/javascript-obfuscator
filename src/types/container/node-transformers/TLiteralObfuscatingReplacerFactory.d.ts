import { IObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/IObfuscatingReplacer';

import { LiteralObfuscatingReplacer } from '../../../enums/container/node-transformers/LiteralObfuscatingReplacer';

export type TLiteralObfuscatingReplacerFactory = (replacer: LiteralObfuscatingReplacer) => IObfuscatingReplacer;
