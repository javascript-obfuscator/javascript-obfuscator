import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

export const SelfDefendingRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.selfDefending) {
        options = {
            ...options,
            compact: true,
            selfDefending: true
        };
    }

    return options;
};
