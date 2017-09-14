import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const SourceMapBaseUrlRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    const { sourceMapBaseUrl }: { sourceMapBaseUrl: string } = options;

    if (!options.sourceMapFileName) {
        options = {
            ...options,
            sourceMapBaseUrl: ''
        };

        return options;
    }

    if (sourceMapBaseUrl && !sourceMapBaseUrl.endsWith('/')) {
        options = {
            ...options,
            sourceMapBaseUrl: `${sourceMapBaseUrl}/`
        };
    }

    return options;
};
