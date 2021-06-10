import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { DEFAULT_PRESET } from '../presets/Default';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const DomainDestRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (!options.domainLock.length) {
        options = {
            ...options,
            domainDest: <string>DEFAULT_PRESET.domainDest
        };
    }

    return options;
};
