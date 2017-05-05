import { TInputOptions } from '../../types/options/TInputOptions';
import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { DEFAULT_PRESET } from '../presets/Default';

const ENABLED_DEAD_CODE_INJECTION_OPTIONS: TInputOptions = {
    deadCodeInjection: true,
    stringArray: true
};

const ENABLED_STRING_ARRAY_THRESHOLD_OPTIONS: TInputOptions = {
    stringArray: true,
    stringArrayThreshold: DEFAULT_PRESET.stringArrayThreshold
};

export const DeadCodeInjectionRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.deadCodeInjection) {
        options = {
            ...options,
            ...ENABLED_DEAD_CODE_INJECTION_OPTIONS,
        };

        if (!options.stringArrayThreshold) {
            options = {
                ...options,
                ...ENABLED_STRING_ARRAY_THRESHOLD_OPTIONS
            };
        }
    }

    return options;
};
