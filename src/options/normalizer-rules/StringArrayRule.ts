import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const StringArrayRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (!options.stringArray) {
        options = {
            ...options,
            rotateStringArray: false,
            stringArray: false,
            stringArrayEncoding: false,
            stringArraySelfDefending: false,
            stringArrayThreshold: 0
        };
    }

    return options;
};
