import { TInputOptions } from '../../types/options/TInputOptions';
import { TOptionsNormalizerRule } from '../../types/options/TOptionsNormalizerRule';

import { IOptions } from '../../interfaces/options/IOptions';

const DISABLED_CONTROL_FLOW_FLATTENING_OPTIONS: TInputOptions = {
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0
};

export const ControlFlowFlatteningThresholdRule: TOptionsNormalizerRule = (options: IOptions): IOptions => {
    if (options.controlFlowFlatteningThreshold === 0) {
        options = {
            ...options,
            ...DISABLED_CONTROL_FLOW_FLATTENING_OPTIONS
        };
    }

    return options;
};
