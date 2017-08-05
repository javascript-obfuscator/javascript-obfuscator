import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

import { SourceMapMode } from '../../enums/SourceMapMode';

/**
 * @param {string} value
 * @returns {string}
 */
export const SourceMapModeSanitizer: TCLISanitizer = (value: string): string => {
    const availableMode: boolean = Object
        .keys(SourceMapMode)
        .some((key: any): boolean => {
            return SourceMapMode[key] === value;
        });

    if (!availableMode) {
        throw new ReferenceError('Invalid value of `--sourceMapMode` option');
    }

    return value;
};
