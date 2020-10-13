import { TTypeFromEnum } from '../utils/TTypeFromEnum';

import { OptionsPreset } from '../../enums/options/presets/OptionsPreset';

export type TOptionsPreset = TTypeFromEnum<typeof OptionsPreset>;
