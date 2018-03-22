import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

import { SourceMapMode } from '../../enums/source-map/SourceMapMode';

/**
 * @param {string} value
 * @returns {string}
 */
export const SourceMapModeSanitizer: TCLISanitizer <string> = (value: string): string => {
    const isCorrectSourceMapMode: boolean = Object
        .keys(SourceMapMode)
        .some((key: string): boolean => {
            return SourceMapMode[<keyof typeof SourceMapMode>key] === value;
        });

    if (!isCorrectSourceMapMode) {
        throw new ReferenceError('Invalid value of `--source-map-mode` option');
    }

    return value;
};
