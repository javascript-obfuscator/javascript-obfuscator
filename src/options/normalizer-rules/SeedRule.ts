import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const SeedRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.seed) {
        return {
            ...options,
            seed: options.seed
        };
    }

    const getRandomInteger: (min: number, max: number) => number = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return {
        ...options,
        seed: getRandomInteger(0, 999_999_999)
    };
};
