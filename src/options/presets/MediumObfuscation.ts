import { TInputOptions } from '../../types/options/TInputOptions';

import { OptionsPreset } from '../../enums/options/presets/OptionsPreset';
import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayWrappersType } from '../../enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { LOW_OBFUSCATION_PRESET } from './LowObfuscation';

export const MEDIUM_OBFUSCATION_PRESET: TInputOptions = Object.freeze({
    ...LOW_OBFUSCATION_PRESET,
    controlFlowFlattening: true,
    deadCodeInjection: true,
    numbersToExpressions: true,
    optionsPreset: OptionsPreset.MediumObfuscation,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArrayEncoding: [
        StringArrayEncoding.Base64
    ],
    stringArrayWrappersCount: 2,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: StringArrayWrappersType.Function,
    transformObjectKeys: true
});
