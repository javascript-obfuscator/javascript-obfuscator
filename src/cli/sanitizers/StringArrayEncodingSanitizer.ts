import { TCLISanitizer } from '../../types/cli/TCLISanitizer';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';

import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

/**
 * @param {string} value
 * @returns {TStringArrayEncoding}
 */
export const StringArrayEncodingSanitizer: TCLISanitizer <TStringArrayEncoding> = (value: string): TStringArrayEncoding => {
    switch (value) {
        case 'true':
        case '1':
        case StringArrayEncoding.Base64:
            return true;

        case StringArrayEncoding.Rc4:
            return StringArrayEncoding.Rc4;

        default:
            return false;
    }
};
