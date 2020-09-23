import * as ESTree from 'estree';

import { ObfuscatingGuardResult } from '../../enums/node/ObfuscatingGuardResult';

export type TObfuscatingGuard = (node: ESTree.Node) => ObfuscatingGuardResult;
