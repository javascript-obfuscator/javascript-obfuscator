import { TypeFromEnum } from '@gradecam/tsenum';

import { OptionsPreset } from '../../enums/options/presets/OptionsPreset';

export type TOptionsPreset = TypeFromEnum<typeof OptionsPreset>;
