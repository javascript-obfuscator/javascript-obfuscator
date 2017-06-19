import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

import { SourceMapMode } from '../../enums/SourceMapMode';

export const SourceMapModeSanitizer: TCLISanitizer = (value: string): string => {
    const availableMode: boolean = Object
        .keys(SourceMapMode)
        .some((key: string): boolean => {
            return SourceMapMode[<any>key] === value;
        });

    if (!availableMode) {
        throw new ReferenceError('Invalid value of `--sourceMapMode` option');
    }

    return value;
};
