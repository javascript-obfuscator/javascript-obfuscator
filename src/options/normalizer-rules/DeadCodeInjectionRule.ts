import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { DEFAULT_PRESET } from '../presets/Default';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const DeadCodeInjectionRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.deadCodeInjection) {
        options = {
            ...options,
            deadCodeInjection: true,
            stringArray: true
        };

        if (!options.stringArrayThreshold) {
            options = {
                ...options,
                stringArray: true,
                stringArrayThreshold: <number>DEFAULT_PRESET.stringArrayThreshold
            };
        }
    }

    return options;
};
