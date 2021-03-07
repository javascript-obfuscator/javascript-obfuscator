import { TTypeFromEnum } from '../utils/TTypeFromEnum';

import { RenamePropertiesMode } from '../../enums/node-transformers/rename-properties-transformers/RenamePropertiesMode';

export type TRenamePropertiesMode = TTypeFromEnum<typeof RenamePropertiesMode>;
