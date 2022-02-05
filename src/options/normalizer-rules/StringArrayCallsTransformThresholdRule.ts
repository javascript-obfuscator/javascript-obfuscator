import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const StringArrayCallsTransformThresholdRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.stringArrayCallsTransformThreshold === 0) {
        options = {
            ...options,
            stringArrayCallsTransform: false,
            stringArrayCallsTransformThreshold: 0
        };
    }

    return options;
};
