import { IIdentifierObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/IIdentifierObfuscatingReplacer';

import { IdentifierObfuscatingReplacer } from '../../../enums/container/node-transformers/IdentifierObfuscatingReplacer';

export type TIdentifierObfuscatingReplacerFactory = (replacer: IdentifierObfuscatingReplacer) => IIdentifierObfuscatingReplacer;
