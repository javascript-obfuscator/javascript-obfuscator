import { IIdentifierObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/IIdentifierObfuscatingReplacer';

import { IdentifierObfuscatingReplacers } from '../../../enums/container/node-transformers/IdentifierObfuscatingReplacers';

export type TIdentifierObfuscatingReplacerFactory = (replacer: IdentifierObfuscatingReplacers) => IIdentifierObfuscatingReplacer;
