import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const StringArrayThresholdRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.stringArrayThreshold === 0) {
        options = {
            ...options,
            rotateStringArray: false,
            stringArray: false,
            stringArrayEncoding: false,
            stringArrayThreshold: 0
        };
    }

    return options;
};
