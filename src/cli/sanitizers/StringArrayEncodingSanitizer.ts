import { TCLISanitizer } from '../../types/cli/TCLISanitizer';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';

import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

export const StringArrayEncodingSanitizer: TCLISanitizer = (value: string): TStringArrayEncoding => {
    switch (value) {
        case 'true':
        case '1':
        case StringArrayEncoding.base64:
            return true;

        case StringArrayEncoding.rc4:
            return StringArrayEncoding.rc4;

        default:
            return false;
    }
};
