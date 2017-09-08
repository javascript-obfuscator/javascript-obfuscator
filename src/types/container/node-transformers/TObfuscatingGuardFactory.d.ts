import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';

import { ObfuscatingGuard } from '../../../enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard';

export type TObfuscatingGuardFactory = (nodeGuard: ObfuscatingGuard) => IObfuscatingGuard;
