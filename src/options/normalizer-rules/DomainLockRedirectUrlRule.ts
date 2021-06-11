import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { DEFAULT_PRESET } from '../presets/Default';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const DomainLockRedirectUrlRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (!options.domainLock.length) {
        options = {
            ...options,
            domainLockRedirectUrl: <string>DEFAULT_PRESET.domainLockRedirectUrl
        };
    }

    return options;
};
