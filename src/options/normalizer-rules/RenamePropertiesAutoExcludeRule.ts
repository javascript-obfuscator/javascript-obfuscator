import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const RenamePropertiesAutoExcludeRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (!options.renameProperties) {
        options = {
            ...options,
            renamePropertiesAutoExclude: false
        };
    }

    return options;
};
