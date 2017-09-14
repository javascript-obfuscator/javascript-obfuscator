import { IObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IObfuscatingReplacer';

import { LiteralObfuscatingReplacer } from '../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer';

export type TLiteralObfuscatingReplacerFactory = (replacer: LiteralObfuscatingReplacer) => IObfuscatingReplacer;
