import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const StringArrayEncodingRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.stringArrayEncoding === true) {
        options = {
            ...options,
            stringArrayEncoding: 'base64'
        };
    }

    return options;
};
