import { TInputOptions } from '../../types/options/TInputOptions';
import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

const STRING_ARRAY_ENCODING_OPTIONS: TInputOptions = {
    stringArrayEncoding: 'base64'
};

export const StringArrayEncodingRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.stringArrayEncoding === true) {
        options = {
            ...options,
            ...STRING_ARRAY_ENCODING_OPTIONS
        };
    }

    return options;
};
