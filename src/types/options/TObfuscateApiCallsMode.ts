import { TTypeFromEnum } from '../utils/TTypeFromEnum';

import { ObfuscateApiCallsMode } from '../../enums/node-transformers/converting-transformers/ObfuscateApiCallsMode';

export type TObfuscateApiCallsMode = TTypeFromEnum<typeof ObfuscateApiCallsMode>;
