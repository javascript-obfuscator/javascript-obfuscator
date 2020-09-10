import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const StringArrayWrappersChainedCallsRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.stringArrayWrappersCount === 0) {
        options = {
            ...options,
            stringArrayWrappersChainedCalls: false,
            stringArrayWrappersCount: 0
        };
    }

    return options;
};
