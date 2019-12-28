import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const SplitStringsChunkLengthRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.splitStringsChunkLength === 0) {
        options = {
            ...options,
            splitStrings: false,
            splitStringsChunkLength: 0
        };
    } else {
        options = {
            ...options,
            splitStringsChunkLength: Math.floor(options.splitStringsChunkLength)
        };
    }

    return options;
};
