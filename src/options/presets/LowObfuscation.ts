import { TInputOptions } from '../../types/options/TInputOptions';

import { OptionsPreset } from '../../enums/options/presets/OptionsPreset';

import { DEFAULT_PRESET } from './Default';

export const LOW_OBFUSCATION_PRESET: TInputOptions = Object.freeze({
    ...DEFAULT_PRESET,
    disableConsoleOutput: true,
    optionsPreset: OptionsPreset.LowObfuscation,
    stringArrayRotate: true,
    selfDefending: true,
    simplify: true,
    stringArrayCallsTransform: false,
    stringArrayCallsTransformThreshold: 0,
    stringArrayShuffle: true
});
