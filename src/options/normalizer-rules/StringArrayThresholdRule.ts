import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';

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
            stringArrayEncoding: [
                StringArrayEncoding.None
            ],
            stringArrayWrappersChainedCalls: false,
            stringArrayWrappersCount: 0,
            stringArrayThreshold: 0
        };
    }

    return options;
};
