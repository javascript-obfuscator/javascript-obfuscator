import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const IdentifierNamesCacheRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    let identifierNamesCache = options.identifierNamesCache;

    if (identifierNamesCache && !identifierNamesCache.globalIdentifiers) {
        identifierNamesCache = {
            ...identifierNamesCache,
            globalIdentifiers: {}
        };
    }

    if (identifierNamesCache && !identifierNamesCache.propertyIdentifiers) {
        identifierNamesCache = {
            ...identifierNamesCache,
            propertyIdentifiers: {}
        };
    }

    options = {
        ...options,
        identifierNamesCache
    };

    return options;
};
