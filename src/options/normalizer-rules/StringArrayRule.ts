import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const StringArrayRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (!options.stringArray) {
        options = {
            ...options,
            rotateStringArray: false,
            shuffleStringArray: false,
            stringArray: false,
            stringArrayEncoding: [
                StringArrayEncoding.None
            ],
            stringArrayIntermediateVariablesCount: 0,
            stringArrayThreshold: 0
        };
    }

    return options;
};
