import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const IdentifiersPrefixRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    const { identifiersPrefix }: { identifiersPrefix: string | boolean } = options;
    const isStringPrefix: boolean = !!identifiersPrefix && typeof identifiersPrefix === 'string';
    const isRandomPrefix: boolean = identifiersPrefix === true;

    if (isStringPrefix || isRandomPrefix) {
        return options;
    }

    const normalizedIdentifiersPrefix: string | boolean = typeof identifiersPrefix === 'number'
        ? String(identifiersPrefix)
        : false;

    return {
        ...options,
        identifiersPrefix: normalizedIdentifiersPrefix
    };
};
