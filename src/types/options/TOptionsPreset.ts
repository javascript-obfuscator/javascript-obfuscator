import { TTypeFromEnum } from '../utils/TTypeFromEnym';

import { OptionsPreset } from '../../enums/options/presets/OptionsPreset';

export type TOptionsPreset = TTypeFromEnum<typeof OptionsPreset>;
