import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

import { ObfuscateApiCallsMode } from '../../enums/node-transformers/converting-transformers/ObfuscateApiCallsMode';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const ObfuscateApiCallsModeRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (!options.obfuscateApiCalls) {
        options = {
            ...options,
            obfuscateApiCallsMode: ObfuscateApiCallsMode.CallsOnly
        };
    }

    return options;
};
