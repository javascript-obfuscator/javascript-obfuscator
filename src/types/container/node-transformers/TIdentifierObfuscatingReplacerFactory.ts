import { IIdentifierObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';

import { IdentifierObfuscatingReplacer } from '../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer';

export type TIdentifierObfuscatingReplacerFactory = (replacer: IdentifierObfuscatingReplacer) => IIdentifierObfuscatingReplacer;
