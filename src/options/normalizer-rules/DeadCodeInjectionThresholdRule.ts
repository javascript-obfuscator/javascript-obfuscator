import { TInputOptions } from '../../types/options/TInputOptions';
import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

const DISABLED_DEAD_CODE_INJECTION_OPTIONS: TInputOptions = {
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0
};

export const DeadCodeInjectionThresholdRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.deadCodeInjectionThreshold === 0) {
        options = {
            ...options,
            ...DISABLED_DEAD_CODE_INJECTION_OPTIONS
        };
    }

    return options;
};
