import { TCLISanitizer } from '../../types/cli/TCLISanitizer';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';

import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

import { ArraySanitizer } from './ArraySanitizer';

/**
 * @param {string} value
 * @returns {TStringArrayEncoding[]}
 */
export const StringArrayEncodingSanitizer: TCLISanitizer <TStringArrayEncoding[]> = (value: string): TStringArrayEncoding[] => {
    const valuesAsArray: TStringArrayEncoding[] = <TStringArrayEncoding[]>ArraySanitizer(value);

    const isCorrectStringArrayEncodings: boolean = valuesAsArray.every((item: TStringArrayEncoding) =>
        Object
            .values(StringArrayEncoding)
            .includes(item)
    );

    if (!isCorrectStringArrayEncodings) {
        throw new ReferenceError('Invalid value of `--string-array-encoding` option');
    }

    return valuesAsArray;
};
