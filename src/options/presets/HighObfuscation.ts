import { TInputOptions } from '../../types/options/TInputOptions';

import { OptionsPreset } from '../../enums/options/presets/OptionsPreset';
import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';

import { MEDIUM_OBFUSCATION_PRESET } from './MediumObfuscation';

export const HIGH_OBFUSCATION_PRESET: TInputOptions = Object.freeze({
    ...MEDIUM_OBFUSCATION_PRESET,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: true,
    optionsPreset: OptionsPreset.HighObfuscation,
    splitStringsChunkLength: 5,
    stringArrayEncoding: [
        StringArrayEncoding.Rc4
    ],
    stringArrayWrappersCount: 5,
    stringArrayWrappersParametersMaxCount: 5,
    stringArrayThreshold: 1
});
