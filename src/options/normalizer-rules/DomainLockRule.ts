import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { Utils } from '../../utils/Utils';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const DomainLockRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.domainLock.length) {
        const normalizedDomains: string[] = [];

        for (const domain of options.domainLock) {
            normalizedDomains.push(Utils.extractDomainFrom(domain));
        }

        options = {
            ...options,
            domainLock: normalizedDomains
        };
    }

    return options;
};
