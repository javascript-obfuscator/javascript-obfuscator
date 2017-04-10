import { TInputOptions } from '../../types/options/TInputOptions';
import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

const DISABLED_STRING_ARRAY_OPTIONS: TInputOptions = {
    rotateStringArray: false,
    stringArray: false,
    stringArrayEncoding: false,
    stringArrayThreshold: 0
};

export const StringArrayRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (!options.stringArray) {
        options = {
            ...options,
            ...DISABLED_STRING_ARRAY_OPTIONS
        };
    }

    return options;
};
