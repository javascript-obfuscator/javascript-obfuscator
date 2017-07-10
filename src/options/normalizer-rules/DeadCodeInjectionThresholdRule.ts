import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const DeadCodeInjectionThresholdRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.deadCodeInjectionThreshold === 0) {
        options = {
            ...options,
            deadCodeInjection: false,
            deadCodeInjectionThreshold: 0
        };
    }

    return options;
};
