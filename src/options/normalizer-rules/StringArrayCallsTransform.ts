import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const StringArrayCallsTransformRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (!options.stringArrayCallsTransform) {
        options = {
            ...options,
            stringArrayCallsTransform: false,
            stringArrayCallsTransformThreshold: 0
        };
    }

    return options;
};
