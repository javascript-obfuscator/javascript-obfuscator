import { TInputOptions } from '../../types/options/TInputOptions';
import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

const SELF_DEFENDING_OPTIONS: TInputOptions = {
    compact: true,
    selfDefending: true
};

export const SelfDefendingRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.selfDefending) {
        options = {
            ...options,
            ...SELF_DEFENDING_OPTIONS
        };
    }

    return options;
};
