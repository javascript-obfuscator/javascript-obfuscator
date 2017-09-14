import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

/**
 * @param {IOptions} options
 * @returns {IOptions}
 */
export const ControlFlowFlatteningThresholdRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.controlFlowFlatteningThreshold === 0) {
        options = {
            ...options,
            controlFlowFlattening: false,
            controlFlowFlatteningThreshold: 0
        };
    }

    return options;
};
