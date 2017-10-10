import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const StringArrayEncodingRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.stringArrayEncoding === true) {
        options = {
            ...options,
            stringArrayEncoding: StringArrayEncoding.Base64
        };
    }

    return options;
};
