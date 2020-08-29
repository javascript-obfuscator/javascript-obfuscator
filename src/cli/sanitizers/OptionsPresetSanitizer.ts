import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

import { OptionsPreset } from '../../enums/options/presets/OptionsPreset';

/**
 * @param {string} value
 * @returns {string}
 */
export const OptionsPresetSanitizer: TCLISanitizer <string> = (value: string): string => {
    const isCorrectOptionsPreset: boolean = Object
        .keys(OptionsPreset)
        .some((key: string): boolean => {
            return OptionsPreset[<keyof typeof OptionsPreset>key] === value;
        });

    if (!isCorrectOptionsPreset) {
        throw new ReferenceError('Invalid value of `--options-preset` option');
    }

    return value;
};
