import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const StringArrayEncodingRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (!options.stringArrayEncoding.length) {
        options = {
            ...options,
            stringArrayEncoding: [
                StringArrayEncoding.None
            ]
        };
    }
    
    return options;
};
